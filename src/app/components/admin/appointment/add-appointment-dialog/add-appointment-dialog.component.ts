import {AfterViewChecked, Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.sass']
})
export class AddAppointmentDialogComponent extends DefaultComponent<Appointment> implements OnInit, AfterViewChecked {

  listOfStaffs: Staff[] = [];

  searchText = '';

  appointmentForm = new FormGroup({
    appointmentStatus: new FormControl('', Validators.required),
    client: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
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

  constructor(private appointmentService: AppointmentService, protected snackBar: MatSnackBar,
              private clientService: ClientService, private locationService: LocationService,
              private staffService: StaffService, private treatmentService: TreatmentService,
              private durationService: TreatmentDurationService) {
    super(appointmentService, snackBar);
  }

  ngAfterViewChecked(): void {
  }

  ngOnInit(): void {
    this.initSelects();
  }

  save(): any {
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

  initSelects(): void {
    super.initSelectConfig(this.treatmentService, this.treatmentSelectConfig);
    super.initSelectConfig(this.locationService, this.locationSelectConfig);
    super.initSelectConfig(this.durationService, this.durationSelectConfig);

    this.getAllStaffs();
    this.getAllClient();
  }
}
