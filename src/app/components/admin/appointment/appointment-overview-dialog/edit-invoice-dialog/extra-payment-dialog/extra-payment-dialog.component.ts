import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {ClientService} from "../../../../../../service/client.service";
import {PaymentMethodService} from "../../../../../../service/payment-method.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Client} from "../../../../../../models/entity/client";
import {FieldConfig} from "../../../../../../models/util/FIeldConfig";
import {FormControlNames, InputTypes} from "../../../../../../const/const";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CriteriaBuilder} from "../../../../../../util/criteria-builder";
import {SpinnerService} from "../../../../../../service/spinner.service";
import {MatSpinner} from "@angular/material/progress-spinner";
import {CKEditorComponent} from "@ckeditor/ckeditor5-angular";
// @ts-ignore
import * as ClassicEditor from "lib/ckeditor5-build-classic";
import {map} from "rxjs/operators";
import {ExtraPayment} from "../../../../../../models/entity/extra-payment";
import {InvoiceService} from "../../../../../../service/invoice.service";

@Component({
  selector: "app-extra-payment-dialog",
  templateUrl: "./extra-payment-dialog.component.html",
  styleUrls: ["./extra-payment-dialog.component.sass"]
})
export class ExtraPaymentDialogComponent implements OnInit {

  @ViewChild("editor", {static: false}) editorComponent!: CKEditorComponent;
  public Editor = ClassicEditor;

  @ViewChild("spinner") spinner!: MatSpinner;
  listOfClients: Client[] = [];

  searchForm = new FormGroup({
    searchBilledClient: new FormControl("")
  });

  extraPaymentForm = new FormGroup({
    paymentMethod: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required)
  });

  paymentMethodSelectConfig: FieldConfig = {
    name: FormControlNames.PAYMENT_METHOD_FORM_CONTROL,
    type: InputTypes.SELECT_TYPE_NAME
  };
  searchBilledInputConfig: FieldConfig = {
    name: FormControlNames.SEARCH_BILLED_CLIENT_FORM_CONTROL,
    type: InputTypes.INPUT_TYPE_NAME
  };
  priceInputConfig: FieldConfig = {name: FormControlNames.PRICE_FORM_CONTROL, type: InputTypes.NUMBER};

  constructor(@Inject(MAT_DIALOG_DATA) public extraPaymentData: ExtraPayment, private invoiceService: InvoiceService,
              private clientService: ClientService, private spinnerService: SpinnerService,
              private paymentMethodService: PaymentMethodService, private dialogRef: MatDialogRef<ExtraPaymentDialogComponent>) {
  }


  ngOnInit(): void {
    this.getPaymentMethods();
  }

  getPaymentMethods(): void {
    this.paymentMethodService.getAll()
      .pipe(map((item) => item.filter((pM) => pM.name?.toUpperCase().includes("CASH"))))
      .subscribe((resp) => {
        this.paymentMethodSelectConfig.options = resp;
      });
  }

  searchBilledClient(): void {
    const search = this.searchForm.get(FormControlNames.SEARCH_BILLED_CLIENT_FORM_CONTROL)?.value;
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.startsWith("person.firstName", search).or()
      .startsWith("person.contacts.value", search);
    queryBuilder.criteriaList = queryBuilder.criteriaList.filter((searchCriteria) => searchCriteria.secondOperand !== "");
    if (search.length > 2) {
      this.spinnerService.show(this.spinner);
      this.clientService.getAllSearchByQueryParam(queryBuilder.buildUrlEncoded())
        .subscribe((resp) => {
          this.listOfClients = resp;
          this.spinnerService.hide(this.spinner);
        });
    } else if (search.length === 0) {
      this.listOfClients = [];
    }
  }

  selectBilledClient(client: Client): void {
    this.extraPaymentData.billedClient = client;
  }

  save(): void {
    this.spinnerService.show(this.spinner);
    const extraPayment: ExtraPayment = this.extraPaymentForm.getRawValue();
    extraPayment.description = this.editorComponent.editorInstance?.getData();
    // @ts-ignore
    extraPayment.billedClient = {id: this.extraPaymentData.billedClient.id};

    this.invoiceService.addExtraPaymentToInvoice(this.extraPaymentData.idInvoice.id, extraPayment).subscribe((resp) => {
      this.dialogRef.close(resp);
      this.spinnerService.hide(this.spinner);
    }, () => {
      this.spinnerService.hide(this.spinner);
    });
  }
}
