import {AfterViewChecked, ChangeDetectorRef, Component, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {Appointment} from '../../../../models/entity/appointment';
import {AppointmentService} from '../../../../service/appointment.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClientService} from '../../../../service/client.service';
import {LocationService} from '../../../../service/location.service';
import {StaffService} from '../../../../service/staff.service';
import {TreatmentService} from '../../../../service/treatment.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TreatmentDurationService} from '../../../../service/treatment-duration.service';
import {FieldConfig} from '../../../../models/util/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {Staff} from '../../../../models/entity/staff';
import * as moment from 'moment';
import {Treatment} from '../../../../models/entity/treatment';
import {AppointmentStatusService} from '../../../../service/appointment-status.service';
import {CKEditorComponent} from '@ckeditor/ckeditor5-angular';
// @ts-ignore
import * as ClassicEditor from 'lib/ckeditor5-build-classic';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppointmentDTO} from '../../../../models/dto/AppointmentDTO';
import {TreatmentDuration} from '../../../../models/entity/treatment-duration';
import {Client} from '../../../../models/entity/client';
import {CriteriaBuilder} from '../../../../util/criteria-builder';
import {Location} from 'src/app/models/entity/location';
import {MatSpinner} from '@angular/material/progress-spinner';
import {PaymentMethodService} from '../../../../service/payment-method.service';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {SnackBarUtil} from '../../../../util/snack-bar-uitl';
import {Room} from '../../../../models/entity/room';

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

  isMobile = false;
  numberOfPage = 0;

  selectedClients: Client[] = this.data.clients ? this.data.clients : [];
  listOfClients: Client[] = [];


  appointmentForm = new FormGroup({
    appointmentStatus: new FormControl('', Validators.required),
    date: new FormControl(this.data ? new Date(this.data.date) : new Date(), Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required),

    // @ts-ignore
    room: new FormControl(this.data.room ? this.data.room : '', Validators.required),
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
    this.findTreatmentDuration();
    this.getResolution();
    setTimeout(() => {
      this.initSelects();
      if (this.data) {
        this.appointmentForm.controls.startTime.setValue(this.data.startTime);
        this.appointmentForm.controls.staff.setValue(this.data.staff);
      }
    }, 100);
  }

  removeClient(client: Client): void {
    const index = this.selectedClients.indexOf(client);
    this.selectedClients.splice(index, 1);
  }

  selectClient(client: Client): void {
    const index = this.selectedClients.indexOf(client);
    const room: Room = this.appointmentForm.get(FormControlNames.ROOM_FORM_CONTROL)?.value;
    if (!room.id) {
      SnackBarUtil.openSnackBar(this.snackBar, 'Izaberi sobu');
    } else {
      // @ts-ignore
      if (this.selectedClients.length < room.beds) {
        if (index === -1) {
          this.selectedClients.push(client);
        } else {
          SnackBarUtil.openSnackBar(this.snackBar, 'Klijent je već odabran');
        }
      } else {
        SnackBarUtil.openSnackBar(this.snackBar, 'Maksimalni broj osoba');
      }
    }
  }

  async getAllStaffs(): Promise<void> {
    this.listOfStaffs = await this.staffService.getStaffTherapist().toPromise();
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


  getResolution(): void {
    if (window.screen.width <= 960) {
      this.isMobile = true;
    }
  }

  getClient(): void {
    this.spinnerService.show(this.spinner);
    this.clientService.getPaginationClients(this.numberOfPage)
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

  compareRooms(o1: any, o2: any): boolean {
    if (o2 !== null && o2 !== undefined) {
      if (o1.id && o2.id) {
        return o1.id === o2.id;
      } else {
        return o1 === o2;
      }
    } else {
      return false;
    }
  }

  sumEndTime(): void {
    const endTime = moment(this.appointmentForm.get(FormControlNames.START_TIME_FORM_CONTROL)?.value, 'hh:mm')
      .add(this.appointmentForm.get(FormControlNames.DURATION_FORM_CONTROL)?.value.duration, 'minutes');
    this.appointmentForm.controls.endTime.setValue(endTime.get('hours') + ':' + (endTime.get('minutes') === 0 ? endTime.get('minutes') + '0' : endTime.get('minutes') + ''));
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

  async save(): Promise<void> {
    this.spinnerService.show(this.spinner);
    const appointment: Appointment = this.appointmentForm.getRawValue();
    appointment.clients = this.selectedClients.map((client) => ({id: client.id}));
    appointment.staff = {id: this.appointmentForm.get(FormControlNames.STAFF_FORM_CONTROL)?.value.id};
    appointment.date = moment(appointment.date).format('YYYY-MM-DD');
    appointment.notes = this.editorComponent.editorInstance?.getData();
    appointment.room = {id: this.appointmentForm.get(FormControlNames.ROOM_FORM_CONTROL)?.value.id};
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
}
