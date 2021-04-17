import {AfterViewChecked, Component, Inject, OnInit, ViewChild} from '@angular/core';
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
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.sass']
})
export class AddAppointmentDialogComponent extends DefaultComponent<Appointment> implements OnInit, AfterViewChecked {

  @ViewChild('editor', {static: false}) editorComponent!: CKEditorComponent;
  public Editor = ClassicEditor;
  listOfStaffs: Staff[] = [];
  searchText = '';

  isDurationFCDisabled = true;

  appointmentForm = new FormGroup({
    appointmentStatus: new FormControl('', Validators.required),
    client: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    staff: new FormControl('', Validators.required),
    treatment: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
  });
  searchForm = new FormGroup({
    search: new FormControl()
  });

  locationSelectConfig: FieldConfig = {name: FormControlNames.LOCATION_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  treatmentSelectConfig: FieldConfig = {name: FormControlNames.TREATMENT_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  durationSelectConfig: FieldConfig = {name: FormControlNames.DURATION_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  clientSelectConfig: FieldConfig = {name: FormControlNames.CLIENT_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  appointmentStatusSelectConfig: FieldConfig = {name: FormControlNames.APPOINTMENT_STATUS_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  startTimeInputConfig: FieldConfig = {name: FormControlNames.START_TIME_FORM_CONTROL, type: InputTypes.TIME};
  endTimeInputConfig: FieldConfig = {name: FormControlNames.END_TIME_FORM_CONTROL, type: InputTypes.TIME};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private appointmentService: AppointmentService, protected snackBar: MatSnackBar,
              private clientService: ClientService, private locationService: LocationService,
              private staffService: StaffService, private treatmentService: TreatmentService,
              private appointmentStatusService: AppointmentStatusService) {
    super(appointmentService, snackBar);
  }

  ngAfterViewChecked(): void {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.initSelects();
  }

  getAllStaffs(): void {
    this.staffService.getAll().subscribe((resp) => {
      this.listOfStaffs = resp;
    });
  }

  getAllClient(): void {
    this.clientService.getAll().subscribe((resp) => {
      this.clientSelectConfig.options = resp.map((client) => ({
        id: client.id,
        fullName: client.person?.firstName + ' ' + client.person?.lastName
      }));
    });
  }

  onTreatmentSelect(): void {
    this.durationSelectConfig.options = [];
    const treatment: Treatment = this.appointmentForm.get(FormControlNames.TREATMENT_FORM_CONTROL)?.value;
    this.durationSelectConfig.options = treatment.durations;
    this.isDurationFCDisabled = false;
  }

  initSelects(): void {
    super.initSelectConfig(this.treatmentService, this.treatmentSelectConfig);
    super.initSelectConfig(this.locationService, this.locationSelectConfig);
    super.initSelectConfig(this.appointmentStatusService, this.appointmentStatusSelectConfig);
    this.getAllStaffs();
    this.getAllClient();
  }

  save(): void {
    const appointment: Appointment = this.appointmentForm.getRawValue();
    appointment.client = {id: appointment.client?.id};
    appointment.treatment = {id: appointment.treatment?.id};
    appointment.location = {id: appointment.location?.id};
    appointment.date = moment(appointment.date).format('YYYY-MM-DD');
    appointment.startTime = appointment.startTime + ':00';
    appointment.endTime = appointment.endTime + ':00';
    appointment.duration = appointment.duration.duration;
    appointment.notes = this.editorComponent.editorInstance?.getData();
    this.subscribeSave(appointment);
  }

  sumEndTime(): void {
    const endTime = moment(this.appointmentForm.get(FormControlNames.START_TIME_FORM_CONTROL)?.value, 'hh:mm')
      .add(this.appointmentForm.get(FormControlNames.DURATION_FORM_CONTROL)?.value.duration, 'minutes');
    this.appointmentForm.controls.endTime.setValue(endTime.get('hours') + ':' + endTime.get('minutes'));
  }
}
