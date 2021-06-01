import {AfterViewChecked, ChangeDetectorRef, Component, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {Appointment} from '../../../../models/appointment';
import {AppointmentService} from '../../../../service/appointment.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClientService} from '../../../../service/client.service';
import {LocationService} from '../../../../service/location.service';
import {StaffService} from '../../../../service/staff.service';
import {TreatmentService} from '../../../../service/treatment.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TreatmentDurationService} from '../../../../service/treatment-duration.service';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {Staff} from '../../../../models/staff';
import * as moment from 'moment';
import {Treatment} from '../../../../models/treatment';
import {AppointmentStatusService} from '../../../../service/appointment-status.service';
import {CKEditorComponent} from '@ckeditor/ckeditor5-angular';
// @ts-ignore
import * as ClassicEditor from 'lib/ckeditor5-build-classic';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppointmentDTO} from '../../../../models/AppointmentDTO';
import {TreatmentDuration} from '../../../../models/treatment-duration';
import {Client} from '../../../../models/client';
import {CriteriaBuilder} from '../../../../util/criteria-builder';
import {Location} from 'src/app/models/location';
import {MatSpinner} from '@angular/material/progress-spinner';
import {PaymentMethodService} from '../../../../service/payment-method.service';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.sass']
})
export class AddAppointmentDialogComponent extends DefaultComponent<Appointment> implements OnInit, AfterViewChecked {

  @ViewChild('clientSpinner') clientSpinner!: MatSpinner;
  @ViewChild('editor', {static: false}) editorComponent!: CKEditorComponent;
  public Editor = ClassicEditor;

  listOfLocations: Location[] = [];
  listOfStaffs: Staff[] = [];

  searchText = '';

  treatment: Treatment = {};
  treatmentDuration: TreatmentDuration = {};
  isDurationFCDisabled = true;

  clientPage = 0;

  selectedClients: Client[] = this.data.clients ? this.data.clients : [];
  listOfClients: Client[] = [];


  appointmentForm = new FormGroup({
    appointmentStatus: new FormControl('', Validators.required),
    date: new FormControl(this.data ? new Date(this.data.date) : new Date(), Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required),

    // @ts-ignore
    room: new FormControl(this.data.room ? this.data.room.id : '', Validators.required),
    staff: new FormControl(this.data.staff, Validators.required),
    treatment: new FormControl('', Validators.required),
    treatmentDuration: new FormControl('', Validators.required),
  });
  searchForm = new FormGroup({
    search: new FormControl()
  });

  searchClientForm = new FormGroup({
    search: new FormControl('')
  });


  locationSelectConfig: FieldConfig = {name: FormControlNames.LOCATION_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  treatmentSelectConfig: FieldConfig = {name: FormControlNames.TREATMENT_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  durationSelectConfig: FieldConfig = {name: FormControlNames.DURATION_FORM_CONTROL, type: InputTypes.SELECT_TYPE_NAME};
  appointmentStatusSelectConfig: FieldConfig = {name: FormControlNames.APPOINTMENT_STATUS_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  paymentMethodSelectConfig: FieldConfig = {name: FormControlNames.PAYMENT_METHOD_FORM_CONTROL, type: InputTypes.SELECT_TYPE_NAME};
  startTimeInputConfig: FieldConfig = {name: FormControlNames.START_TIME_FORM_CONTROL, type: InputTypes.TIME};
  endTimeInputConfig: FieldConfig = {name: FormControlNames.END_TIME_FORM_CONTROL, type: InputTypes.TIME};
  searchInputConfig: FieldConfig = {name: FormControlNames.SEARCH_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};


  constructor(@Inject(MAT_DIALOG_DATA) public data: AppointmentDTO, private appointmentService: AppointmentService,
              protected snackBar: MatSnackBar, private readonly changeDetectorRef: ChangeDetectorRef,
              private clientService: ClientService, private locationService: LocationService,
              private staffService: StaffService, private treatmentService: TreatmentService,
              private appointmentStatusService: AppointmentStatusService, private paymentMethodService: PaymentMethodService) {
    super(appointmentService, snackBar);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    console.log(this.data);
    this.findTreatmentDuration();
    setTimeout(() => {
      this.initSelects();
      if (this.data) {
        this.appointmentForm.controls.startTime.setValue(this.data.startTime);
        this.appointmentForm.controls.staff.setValue(this.data.staff);
      }
    }, 100);
  }

  selectClient(client: Client): void {
    const index = this.selectedClients.indexOf(client);

    if (index === -1) {
      this.selectedClients.push(client);
    } else {

    }
  }

  async getAllStaffs(): Promise<void> {
    this.listOfStaffs = await this.staffService.getAll().toPromise();
  }


  @HostListener('scroll', ['$event'])
  getAllClient(event: any): void {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.spinnerService.show(this.clientSpinner);
      setTimeout(() => {
        this.clientService.getPaginationClients(this.clientPage++)
          .subscribe((resp) => {
            this.listOfClients = this.listOfClients.concat(resp);
            this.spinnerService.hide(this.clientSpinner);
          });
      }, 500);
    }
  }

  getClient(): void {
    this.spinnerService.show(this.spinner);
    this.clientService.getPaginationClients(this.clientPage)
      .subscribe((resp) => {
        this.listOfClients = this.listOfClients.concat(resp);
        this.spinnerService.hide(this.spinner);
      });
  }

  onTreatmentSelect(): void {
    this.durationSelectConfig.options = [];
    this.durationSelectConfig.options = this.appointmentForm.get(FormControlNames.TREATMENT_FORM_CONTROL)?.value.durations;
    this.isDurationFCDisabled = false;
  }

  async initSelects(): Promise<void> {
    super.initSelectConfig(this.treatmentService, this.treatmentSelectConfig);
    super.initSelectConfig(this.locationService, this.locationSelectConfig);
    super.initSelectConfig(this.appointmentStatusService, this.appointmentStatusSelectConfig);
    super.initSelectConfig(this.paymentMethodService, this.paymentMethodSelectConfig);
    await this.getAllStaffs();
    this.getClient();

  }

  findTreatmentDuration(): void {
    if (this.data && this.data.id) {
      // @ts-ignore
      this.treatmentService.findById(this.data.treatment.treatmentId).subscribe((treatment) => {
        this.treatment = treatment;
      });
      // @ts-ignore
      this.treatmentService.getTreatmentDurations(this.data.treatment?.treatmentId).subscribe((treatmentDurations) => {
        this.durationSelectConfig.options = treatmentDurations;
        this.treatmentDuration = treatmentDurations.find((treatmentDuration) =>
          treatmentDuration.id === this.data.treatment?.treatmentDurationId) || {};
        this.isDurationFCDisabled = false;
      });
    }
  }

  async save(): Promise<void> {
    this.spinnerService.show(this.spinner);
    const appointment: Appointment = this.appointmentForm.getRawValue();
    appointment.clients = this.selectedClients;
    appointment.staff = {id: this.appointmentForm.get(FormControlNames.STAFF_FORM_CONTROL)?.value.id};
    appointment.date = moment(appointment.date).format('YYYY-MM-DD');
    appointment.notes = this.editorComponent.editorInstance?.getData();
    appointment.room = {id: this.appointmentForm.get(FormControlNames.ROOM_FORM_CONTROL)?.value};
    delete appointment.treatmentDuration?.treatment;
    // @ts-ignore
    delete appointment.treatment;
    // @ts-ignore
    appointment.treatmentDuration?.treatment = {id: this.appointmentForm.get(FormControlNames.TREATMENT_FORM_CONTROL)?.value.id};
    if (this.data.id) {
      appointment.id = this.data.id;
      super.subscribeUpdate(appointment);
      this.spinnerService.hide(this.spinner);
    } else {
      this.subscribeSave(appointment);
      this.spinnerService.hide(this.spinner);
    }
  }

  sumEndTime(): void {
    const endTime = moment(this.appointmentForm.get(FormControlNames.START_TIME_FORM_CONTROL)?.value, 'hh:mm')
      .add(this.appointmentForm.get(FormControlNames.DURATION_FORM_CONTROL)?.value.duration, 'minutes');
    this.appointmentForm.controls.endTime.setValue(endTime.get('hours') + ':' + endTime.get('minutes'));
  }

  search(): void {
    const queryBuilder = new CriteriaBuilder();
    const search: string = this.searchClientForm.get(FormControlNames.SEARCH_FORM_CONTROL)?.value;
    queryBuilder.startsWith('person.firstName', search).or()
      .startsWith('person.contacts.value', search);
    queryBuilder.criteriaList = queryBuilder.criteriaList.filter((searchCriteria) => searchCriteria.secondOperand !== '');
    if (search.length > 1) {
      this.clientService.getAllSearchByQueryParam(queryBuilder.buildUrlEncoded())
        .pipe()
        .subscribe((resp) => {
          this.listOfClients = resp;
        });
    } else if (search.length === 0) {
      this.getClient();
    }
  }

  displayFn(staff: Staff): Staff | string {
    return staff ? staff.person?.firstName + ' ' + staff.person?.lastName : '';
  }
}
