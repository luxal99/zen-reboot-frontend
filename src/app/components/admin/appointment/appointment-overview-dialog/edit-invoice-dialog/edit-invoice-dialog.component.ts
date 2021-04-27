import {Component, Inject, OnInit} from '@angular/core';
import {InvoiceService} from '../../../../../service/invoice.service';
import {InvoiceStatusService} from '../../../../../service/invoice-status.service';
import {Invoice} from '../../../../../models/invoice';
import {DefaultComponent} from '../../../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {AppointmentDTO} from '../../../../../models/AppointmentDTO';
import * as moment from 'moment';
import {AppointmentService} from '../../../../../service/appointment.service';
import {Client} from '../../../../../models/client';
import {CriteriaBuilder} from '../../../../../util/criteria-builder';
import {FormControlNames, InputTypes} from '../../../../../const/const';
import {ClientService} from '../../../../../service/client.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactTypeEnum} from '../../../../../enums/ContactTypeEnum';
import {Contact} from '../../../../../models/contact';
import {FieldConfig} from '../../../../../models/FIeldConfig';
import {DialogUtil} from '../../../../../util/dialog-util';
import {ClientOverviewDialogComponent} from '../../../client/client-overview-dialog/client-overview-dialog.component';
import {Appointment} from '../../../../../models/appointment';
import {InvoiceStatus} from '../../../../../models/invoice-status';
import {LocationService} from '../../../../../service/location.service';

@Component({
  selector: 'app-edit-invoice-dialog',
  templateUrl: './edit-invoice-dialog.component.html',
  styleUrls: ['./edit-invoice-dialog.component.sass']
})
export class EditInvoiceDialogComponent extends DefaultComponent<Invoice> implements OnInit {

  invoice: Invoice = {};

  listOfSelectedAppointments: Appointment[] = [this.data];
  listOfClients: Client[] = [];
  listOfAppointments: Appointment[] = [];
  listOfInvoiceStatuses: InvoiceStatus[] = [];

  selectedClient: Client = {};
  selectedBilledClient: Client = {};

  invoiceForm = new FormGroup({
    client: new FormControl('', Validators.required),
    billedClient: new FormControl('', Validators.required),
    invoiceStatus: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required)
  });

  searchForm = new FormGroup({
    searchBilledClient: new FormControl(''),
    searchClient: new FormControl('')
  });

  searchClientInputConfig: FieldConfig = {name: FormControlNames.SEARCH_CLIENT_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  searchBilledInputConfig: FieldConfig = {name: FormControlNames.SEARCH_BILLED_CLIENT_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  invoiceStatusSelectConfig: FieldConfig = {name: FormControlNames.INVOICE_STATUS_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  locationSelectConfig: FieldConfig = {name: FormControlNames.LOCATION_FORM_CONTROL, type: InputTypes.SELECT_TYPE_NAME};


  constructor(@Inject(MAT_DIALOG_DATA) public data: AppointmentDTO,
              private invoiceService: InvoiceService, protected snackBar: MatSnackBar,
              private clientService: ClientService, private dialog: MatDialog, private locationService: LocationService,
              private invoiceStatusService: InvoiceStatusService, private appointmentService: AppointmentService) {
    super(invoiceService, snackBar);
  }

  ngOnInit(): void {
    this.findInvoice();
    this.initSelect();
  }

  initSelect(): void {
    super.initSelectConfig(this.invoiceStatusService, this.invoiceStatusSelectConfig);
    super.initSelectConfig(this.locationService, this.locationSelectConfig);
  }

  findInvoice(): void {
    this.appointmentService.findInvoiceForAppointment(this.data.id).subscribe((invoice) => {
      this.invoice = invoice;
      this.invoice.date = moment(invoice.date).format('DD MMMM YYYY');
      this.spinnerService.hide(this.spinner);
    });
  }

  searchBilledClient(): void {

    const search = this.searchForm.get(FormControlNames.SEARCH_BILLED_CLIENT_FORM_CONTROL)?.value;
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.startsWith('person.firstName', search).or()
      .startsWith('person.contacts.value', search);
    queryBuilder.criteriaList = queryBuilder.criteriaList.filter((searchCriteria) => searchCriteria.secondOperand !== '');
    if (search.length > 2) {
      this.clientService.getAllSearchByQueryParam(queryBuilder.buildUrlEncoded())
        .subscribe((resp) => {
          this.listOfClients = resp;
        });
    } else if (search.length === 0) {
      this.listOfClients = [];
    }
  }

  searchClient(): void {
    const queryBuilder = new CriteriaBuilder();
    const search = this.searchForm.get(FormControlNames.SEARCH_CLIENT_FORM_CONTROL)?.value;
    queryBuilder.startsWith('person.firstName', search).or()
      .startsWith('person.contacts.value', search);
    queryBuilder.criteriaList = queryBuilder.criteriaList.filter((searchCriteria) => searchCriteria.secondOperand !== '');
    if (search.length > 2) {
      this.clientService.getAllSearchByQueryParam(queryBuilder.buildUrlEncoded())
        .subscribe((resp) => {
          this.listOfClients = resp;
        });
    } else if (search.length === 0) {
      this.listOfClients = [];
    }
  }

  displayFn(client: Client): string {
    const telephone: Contact = client.person?.contacts.find((contact) => contact.type === ContactTypeEnum.PHONE) || {};
    return client && client.person ? client.person.firstName + ' ' + client.person.lastName +
      ' | ' + telephone.prefix + ' ' + telephone.value : '';
  }

  selectClient(client: Client): void {
    this.selectedClient = client;
  }

  selectBilledClient(client: Client): void {
    console.log(client);
    this.selectedBilledClient = client;
  }

  searchAppointment(): void {
    const search = this.searchForm.get(FormControlNames.SEARCH_CLIENT_FORM_CONTROL)?.value || '';
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.startsWith('client.person.firstName', search).or()
      .startsWith('client.person.contacts.value', search);
    queryBuilder.criteriaList = queryBuilder.criteriaList.filter((searchCriteria) => searchCriteria.secondOperand !== '');

    if (search.length > 2) {
      this.appointmentService.getAll(queryBuilder.buildUrlEncoded()).subscribe((resp) => {
        this.listOfAppointments = resp;
        this.listOfAppointments.filter((app) => app.date = moment(app.date).format('DD MMMM YYYY'));
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
      position: {right: '0'},
      width: '95%',
      height: '100vh',
      data
    }, this.dialog);
  }
}
