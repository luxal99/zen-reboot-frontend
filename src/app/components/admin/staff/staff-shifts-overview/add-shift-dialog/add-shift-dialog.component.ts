import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Shift} from '../../../../../models/shift';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DefaultComponent} from '../../../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShiftService} from '../../../../../service/shift.service';
import {FormControlNames, InputTypes} from '../../../../../const/const';
import {FieldConfig} from '../../../../../models/FIeldConfig';
import * as moment from 'moment';
import {LocationService} from '../../../../../service/location.service';

@Component({
  selector: 'app-add-shift-dialog',
  templateUrl: './add-shift-dialog.component.html',
  styleUrls: ['./add-shift-dialog.component.sass']
})
export class AddShiftDialogComponent extends DefaultComponent<Shift> implements OnInit {

  shiftForm = new FormGroup({
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    location: new FormControl()
  });

  startTimeInputConfig: FieldConfig = {name: FormControlNames.START_TIME_FORM_CONTROL, type: InputTypes.TIME};
  endTimeInputConfig: FieldConfig = {name: FormControlNames.END_TIME_FORM_CONTROL, type: InputTypes.TIME};
  locationSelectConfig: FieldConfig = {name: FormControlNames.LOCATION_FORM_CONTROL, type: InputTypes.SELECT_TYPE_NAME};

  constructor(@Inject(MAT_DIALOG_DATA) public data: Shift, protected snackBar: MatSnackBar,
              private shiftService: ShiftService, private locationService: LocationService) {
    super(shiftService, snackBar);
  }

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations(): void {
    this.locationService.getAll().subscribe((resp) => {
      this.locationSelectConfig.options = resp;
    });
  }

  save(): void {
    const shift: Shift = this.data;
    Object.assign(shift, this.shiftForm.getRawValue());
    console.log(shift);
    // @ts-ignore
    delete shift.staff.shifts;

    shift.date = moment(this.data.date).format('YYYY-MM-DD');
    super.subscribeSave(shift);
  }
}