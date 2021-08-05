import {Component, Inject, OnInit} from "@angular/core";
import {DefaultComponent} from "../../../../util/default-component";
import {VoucherService} from "../../../../service/voucher.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VoucherDto} from "../../../../models/dto/voucher-dto";
import {FieldConfig} from "../../../../models/util/FIeldConfig";
import {FormControlNames, InputTypes, SELECTED_CLASS_NAME} from "../../../../const/const";
import {ClientService} from "../../../../service/client.service";
import {Client} from "../../../../models/entity/client";
import {CriteriaBuilder} from "../../../../util/criteria-builder";
import {VoucherEnum} from "../../../../enums/VoucherEnum";
import {TreatmentService} from "../../../../service/treatment.service";
import * as moment from "moment";
import {Treatment} from "../../../../models/entity/treatment";
import {DiscountTypeService} from "../../../../service/discount-type.service";
import {SnackBarUtil} from "../../../../util/snack-bar-uitl";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Voucher} from "../../../../models/entity/voucher";

@Component({
  selector: "app-add-voucher-dialog",
  templateUrl: "./add-voucher-dialog.component.html",
  styleUrls: ["./add-voucher-dialog.component.sass"]
})
export class AddVoucherDialogComponent extends DefaultComponent<VoucherDto> implements OnInit {

  selectedClient!: Client;
  searchText = "";
  listOfTreatments: Treatment[] = [];
  searchForm = new FormGroup({
    search: new FormControl("")
  });
  numberOfPage = 0;
  listOfClients: Client[] = [];
  voucherForm = new FormGroup({
    type: new FormControl("", Validators.required),
    discount: new FormControl(""),
    treatmentDurations: new FormControl("", Validators.required),
    discountType: new FormControl("", Validators.required),
    paymentMethod: new FormControl("", Validators.required),
    price: new FormControl(""),
    startDate: new FormControl(this.data ? this.data.startDate : moment(new Date()).format("YYYY-MM-DD")),
    endDate: new FormControl(this.data ? this.data.endDate : "")
  });

  discountInputConfig: FieldConfig = {name: FormControlNames.DISCOUNT_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  paymentMethodSelectConfig: FieldConfig = {
    name: FormControlNames.PAYMENT_METHOD_FORM_CONTROL,
    type: InputTypes.SELECT_TYPE_NAME
  };
  treatmentSelectConfig: FieldConfig = {
    name: FormControlNames.TREATMENT_FORM_CONTROL,
    type: InputTypes.INPUT_TYPE_NAME
  };
  durationSelectConfig: FieldConfig = {name: FormControlNames.DURATION_FORM_CONTROL, type: InputTypes.SELECT_TYPE_NAME};
  discountTypeSelectConfig: FieldConfig = {
    name: FormControlNames.DISCOUNT_TYPE_FORM_CONTROL,
    type: InputTypes.SELECT_TYPE_NAME
  };

  typeSelectConfig: FieldConfig = {
    name: FormControlNames.TYPE_FORM_CONTROL,
    type: InputTypes.SELECT_TYPE_NAME,
    options: [VoucherEnum.BLANCO, VoucherEnum.PRODUCT]
  };
  priceInputConfig: FieldConfig = {name: FormControlNames.PRICE_FORM_CONTROL, type: InputTypes.NUMBER};
  isDisplayTypeBlanco = this.data ? this.data.type === VoucherEnum.BLANCO : false;

  startDateInput: FieldConfig = {
    type: InputTypes.DATE,
    name: FormControlNames.START_DATE_FORM_CONTROL,
    label: "Datum početka"
  };
  endDateInput: FieldConfig = {
    type: InputTypes.DATE,
    name: FormControlNames.END_DATE_FORM_CONTROL,
    label: "Datum isteka"
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Voucher, private voucherService: VoucherService,
              private treatmentService: TreatmentService, private discountTypeService: DiscountTypeService,
              protected snackBar: MatSnackBar, private clientService: ClientService) {
    super(voucherService, snackBar);
  }

  ngOnInit(): void {
    this.initSelect();
    this.getClient();
    this.getTreatments();
  }


  getTreatments(): void {
    this.treatmentService.getAll().subscribe((resp) => {
      this.listOfTreatments = resp;
    });
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2 !== null && o2 !== undefined) {
      return o1.name === o2.name && o1.id === o2.id;
    } else {
      return false;
    }
  }

  initSelect(): void {
    super.initSelectConfigWithObservable(this.voucherService.getVoucherPaymentMethod(), this.paymentMethodSelectConfig);
    super.initSelectConfig(this.treatmentService, this.treatmentSelectConfig);
    super.initSelectConfig(this.discountTypeService, this.discountTypeSelectConfig);
  }


  getClient(): void {
    this.clientService.getPaginationClients(++this.numberOfPage).subscribe((resp) => {
      this.listOfClients = resp;
    });
  }

  getNext(): void {

    this.spinnerService.show(this.spinner);
    this.clientService.getPaginationClients(++this.numberOfPage).subscribe((clients) => {
      this.listOfClients = clients;
      this.spinnerService.hide(this.spinner);
    });
  }

  getPrevious(): void {
    if (this.numberOfPage !== 0) {
      this.spinnerService.show(this.spinner);
      this.clientService.getPaginationClients(--this.numberOfPage).subscribe((clients) => {
        this.listOfClients = clients;
        this.spinnerService.hide(this.spinner);
      });
    }
  }

  getCurrentPage(): void {
    this.spinnerService.show(this.spinner);
    this.clientService.getPaginationClients(this.numberOfPage).subscribe((clients) => {
      this.listOfClients = clients;
      this.spinnerService.hide(this.spinner);
    });
  }

  onVoucherTypeSelect(): void {
    this.isDisplayTypeBlanco = this.voucherForm.get(FormControlNames.TYPE_FORM_CONTROL)?.value.toUpperCase() === "BLANCO";

  }

  search(): void {
    const queryBuilder = new CriteriaBuilder();
    const search: string = this.searchForm.get(FormControlNames.SEARCH_FORM_CONTROL)?.value;
    queryBuilder.startsWith("person.firstName", search).or()
      .startsWith("person.contacts.value", search);
    queryBuilder.criteriaList = queryBuilder.criteriaList.filter((searchCriteria) => searchCriteria.secondOperand !== "");
    if (search.length > 3) {
      this.clientService.getAllSearchByQueryParam(queryBuilder.buildUrlEncoded())
        .subscribe((resp) => {
          this.listOfClients = resp;
        });
    } else if (search.length === 0) {
      this.getCurrentPage();
    }
  }

  save(): void {
    if (this.data) {
      this.data.startDate = moment(this.voucherForm.get(FormControlNames.START_DATE_FORM_CONTROL)?.value).format("YYYY-MM-DD");
      this.data.endDate = moment(this.voucherForm.get(FormControlNames.END_DATE_FORM_CONTROL)?.value).format("YYYY-MM-DD");
      super.otherSubscribe(this.voucherService.updateDate(this.data.id, {
        startDate: this.data.startDate,
        endDate: this.data.endDate,
      }));
    } else {
      const voucherDto: VoucherDto = this.voucherForm.getRawValue();
      voucherDto.client = {id: this.selectedClient.id};
      voucherDto.paymentMethod = {id: voucherDto.paymentMethod?.id};
      voucherDto.treatmentDurations = voucherDto.treatmentDurations?.map((item) => ({id: item.id}));

      if (voucherDto.endDate) {
        voucherDto.endDate = moment(voucherDto.endDate).format("YYYY-MM-DD");
      }
      if (!this.selectedClient) {
        SnackBarUtil.openSnackBar(this.snackBar, "Izaberite klijenta");
      } else {
        super.subscribeSave(voucherDto);
      }
    }
  }

  selectClient(client: Client, $event: any): void {
    const element: HTMLElement = $event.target;
    const otherSelectedElements = document.querySelectorAll(".selected");
    [].forEach.call(otherSelectedElements, (el: any) => {
      el.classList.remove("selected");
    });
    if (element.classList.contains(SELECTED_CLASS_NAME)) {
      // @ts-ignore
      this.selectedClient = null;
      element.classList.remove(SELECTED_CLASS_NAME);
    } else {
      element.classList.add(SELECTED_CLASS_NAME);
      this.selectedClient = client;
    }
  }

}
