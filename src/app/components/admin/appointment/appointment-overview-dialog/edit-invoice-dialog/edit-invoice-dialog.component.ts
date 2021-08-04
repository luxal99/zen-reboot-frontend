import {AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit} from "@angular/core";
import {InvoiceService} from "../../../../../service/invoice.service";
import {InvoiceStatusService} from "../../../../../service/invoice-status.service";
import {Invoice} from "../../../../../models/entity/invoice";
import {DefaultComponent} from "../../../../../util/default-component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AppointmentDTO} from "../../../../../models/dto/AppointmentDTO";
import * as moment from "moment";
import {AppointmentService} from "../../../../../service/appointment.service";
import {Client} from "../../../../../models/entity/client";
import {CriteriaBuilder} from "../../../../../util/criteria-builder";
import {FormControlNames, InputTypes} from "../../../../../const/const";
import {ClientService} from "../../../../../service/client.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactTypeEnum} from "../../../../../enums/ContactTypeEnum";
import {Contact} from "../../../../../models/util/contact";
import {FieldConfig} from "../../../../../models/util/FIeldConfig";
import {DialogUtil} from "../../../../../util/dialog-util";
import {ClientOverviewDialogComponent} from "../../../client/client-overview-dialog/client-overview-dialog.component";
import {Appointment} from "../../../../../models/entity/appointment";
import {InvoiceStatus} from "../../../../../models/entity/invoice-status";
import {LocationService} from "../../../../../service/location.service";
import {AppointmentStatusService} from "../../../../../service/appointment-status.service";
import {map} from "rxjs/operators";
import {PaymentMethodService} from "../../../../../service/payment-method.service";
import {PaymentMethod} from "../../../../../models/entity/payment-method";
import {ExtraPaymentDialogComponent} from "./extra-payment-dialog/extra-payment-dialog.component";
import {setDialogConfig} from "../../../../../util/dialog-options";
import {ExtraPayment} from "../../../../../models/entity/extra-payment";

@Component({
  selector: "app-edit-invoice-dialog",
  templateUrl: "./edit-invoice-dialog.component.html",
  styleUrls: ["./edit-invoice-dialog.component.sass"]
})
export class EditInvoiceDialogComponent extends DefaultComponent<Invoice> implements OnInit, AfterViewChecked {

  listOfExtraPayments: ExtraPayment[] = [];
  invoice!: Invoice;

  listOfSelectedAppointments: AppointmentDTO[] = [this.data];
  listOfClients: Client[] = [];
  listOfAppointments: Appointment[] = [];
  listOfInvoiceStatuses: InvoiceStatus[] = [];

  // @ts-ignore
  selectedClients: Client[] = this.data.clients;

  // @ts-ignore
  selectedBilledClient: Client = this.data.clients[0];

  invoiceForm = new FormGroup({
    invoiceStatus: new FormControl("", Validators.required),
    paymentMethod: new FormControl("", Validators.required),
    location: new FormControl("", Validators.required)
  });

  voucherPackageForm = new FormGroup({
    code: new FormControl("")
  });

  searchForm = new FormGroup({
    searchBilledClient: new FormControl(""),
    searchClient: new FormControl("")
  });

  searchClientInputConfig: FieldConfig = {
    name: FormControlNames.SEARCH_CLIENT_FORM_CONTROL,
    type: InputTypes.INPUT_TYPE_NAME
  };
  codeInputConfig: FieldConfig = {name: FormControlNames.CODE_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  searchBilledInputConfig: FieldConfig = {
    name: FormControlNames.SEARCH_BILLED_CLIENT_FORM_CONTROL,
    type: InputTypes.INPUT_TYPE_NAME
  };
  invoiceStatusSelectConfig: FieldConfig = {
    name: FormControlNames.INVOICE_STATUS_FORM_CONTROL,
    type: InputTypes.INPUT_TYPE_NAME
  };
  locationSelectConfig: FieldConfig = {name: FormControlNames.LOCATION_FORM_CONTROL, type: InputTypes.SELECT_TYPE_NAME};
  paymentMethodSelectConfig: FieldConfig = {
    name: FormControlNames.PAYMENT_METHOD_FORM_CONTROL,
    type: InputTypes.SELECT_TYPE_NAME
  };
  isPaymentMethodVoucher = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AppointmentDTO,
              private invoiceService: InvoiceService, protected snackBar: MatSnackBar, private paymentMethodService: PaymentMethodService,
              private appointmentStatusService: AppointmentStatusService, private readonly changeDetectorRef: ChangeDetectorRef,
              private clientService: ClientService, private dialog: MatDialog, private locationService: LocationService,
              private invoiceStatusService: InvoiceStatusService, private appointmentService: AppointmentService) {
    super(invoiceService, snackBar);
  }

  ngOnInit(): void {
    this.findInvoice();
    this.initSelect();
  }

  checkIsPaymentTypeVoucher(): void {
    const paymentMethod: PaymentMethod = this.invoiceForm.get(FormControlNames.PAYMENT_METHOD_FORM_CONTROL)?.value;
    paymentMethod.name?.toLowerCase() === "voucher" ? this.isPaymentMethodVoucher = true : this.isPaymentMethodVoucher = false;
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  initSelect(): void {
    super.initSelectConfig(this.invoiceStatusService, this.invoiceStatusSelectConfig);
    super.initSelectConfig(this.locationService, this.locationSelectConfig);
    super.initSelectConfig(this.paymentMethodService, this.paymentMethodSelectConfig);
  }

  findInvoice(): void {
    this.appointmentService.findInvoiceForAppointment(this.data.id).subscribe((resp) => {
      this.invoice = resp;
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

  searchClient(): void {
    const queryBuilder = new CriteriaBuilder();
    const search = this.searchForm.get(FormControlNames.SEARCH_CLIENT_FORM_CONTROL)?.value;
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

  displayFn(client: Client): string {
    const telephone: Contact = client.person?.contacts.find((contact) => contact.type === ContactTypeEnum.PHONE) || {};
    return client && client.person ? client.person.firstName + " " + client.person.lastName +
      " | " + telephone.prefix + " " + telephone.value : "";
  }

  selectClient(client: Client): void {
    const index = this.selectedClients.indexOf(client);
    index === -1 ? this.selectedClients.push(client) : this.selectedClients.splice(index, 1);
  }

  selectBilledClient(client: Client): void {
    this.selectedBilledClient = client;
  }

  searchAppointment(): void {
    const search = this.searchForm.get(FormControlNames.SEARCH_CLIENT_FORM_CONTROL)?.value || "";
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.startsWith("clients.person.firstName", search)
      .or()
      .startsWith("clients.person.contacts.value", search);
    queryBuilder.criteriaList = queryBuilder.criteriaList.filter((searchCriteria) => searchCriteria.secondOperand !== "");

    if (search.length > 2) {
      this.spinnerService.hide(this.spinner);
      this.appointmentService.getAll(queryBuilder.buildUrlEncoded())
        .pipe(map(value => {
          return value.filter((appointment) => appointment.appointmentStatus?.value === "NEW"
            || appointment.appointmentStatus?.value === "CONFIRMED");
        }))
        .subscribe((resp) => {
          this.listOfAppointments = resp;
          this.spinnerService.hide(this.spinner);
          this.listOfAppointments.filter((app) => app.date = moment(app.date).format("DD MMMM YYYY"));
          this.listOfAppointments = this.listOfAppointments.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);

        });
    } else {
      this.listOfAppointments = [];
    }
  }

  selectAppointment(appointment: Appointment): void {
    if (this.listOfSelectedAppointments.indexOf(appointment) === -1) {
      this.listOfSelectedAppointments.push(appointment);
    }
  }

  openClientOverviewDialog(data: Client): void {
    DialogUtil.openDialog(ClientOverviewDialogComponent, {
      position: {right: "0"},
      width: "95%",
      height: "100vh",
      data
    }, this.dialog);
  }

  removeAppointment(appointment: Appointment): void {
    this.listOfSelectedAppointments.splice(this.listOfSelectedAppointments.indexOf(appointment), 1);
  }

  async save(): Promise<void> {
    const invoice: Invoice = {
      id: this.invoice.id,
      clients: [{id: this.selectedBilledClient.id}],
      billedClient: {id: this.selectedBilledClient.id},
      invoiceStatus: {id: this.invoiceForm.get(FormControlNames.INVOICE_STATUS_FORM_CONTROL)?.value.id},
      date: moment().format("YYYY-MM-DD"),
      paymentMethod: this.invoiceForm.get(FormControlNames.PAYMENT_METHOD_FORM_CONTROL)?.value,
      appointments: this.listOfSelectedAppointments,
      location: {
        // @ts-ignore
        id: this.invoiceForm.get(FormControlNames.LOCATION_FORM_CONTROL)?.value.id,
      }
    };

    this.spinnerService.hide(this.spinner);
    invoice.appointments = invoice.appointments?.map((appointment) => ({id: appointment.id, price: appointment.price}));
    if (invoice.paymentMethod?.name?.toLowerCase() === "voucher" || invoice.paymentMethod?.name?.toLowerCase() === "package") {
      super.otherSubscribe(this.invoiceService.update(invoice, this.voucherPackageForm.get(FormControlNames.CODE_FORM_CONTROL)?.value,
        invoice.paymentMethod.name));

      this.spinnerService.hide(this.spinner);
    } else {
      super.subscribeUpdate(invoice, [() => {
        this.spinnerService.hide(this.spinner);
      }]);
    }
  }

  openExtraPaymentDialog(): void {
    DialogUtil.openDialog(ExtraPaymentDialogComponent, setDialogConfig({
      width: "40%",
      data: {
        billedClient: this.selectedBilledClient,
        idInvoice: this.invoice
      }
    }), this.dialog).afterClosed().subscribe((resp) => {
      this.listOfExtraPayments.push(resp);
    });
  }
}
