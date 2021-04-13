import {AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
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
export class AddShiftDialogComponent extends DefaultComponent<Shift> implements OnInit, AfterViewChecked {

  date = '';
  shiftForm = new FormGroup({
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    location: new FormControl()
  });

  startTimeInputConfig: FieldConfig = {name: FormControlNames.START_TIME_FORM_CONTROL, type: InputTypes.TIME};
  endTimeInputConfig: FieldConfig = {name: FormControlNames.END_TIME_FORM_CONTROL, type: InputTypes.TIME};
  locationSelectConfig: FieldConfig = {name: FormControlNames.LOCATION_FORM_CONTROL, type: InputTypes.SELECT_TYPE_NAME};

  constructor(@Inject(MAT_DIALOG_DATA) public data: Shift, protected snackBar: MatSnackBar,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private shiftService: ShiftService, private locationService: LocationService) {
    super(shiftService, snackBar);
  }

  ngOnInit(): void {
    this.date = moment(this.data.date).format('DD MMMM YYYY');
    this.getAllLocations();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  getAllLocations(): void {
    this.locationService.getAll().subscribe((resp) => {
      this.locationSelectConfig.options = resp;
    });
  }

  save(): void {
    const shift: Shift = this.data;
    Object.assign(shift, this.shiftForm.getRawValue());
    // @ts-ignore
    delete shift.staff.shifts;

    shift.date = moment(this.data.date).format('YYYY-MM-DD');

    shift.location?.rooms?.filter((room) => delete room.location);
    if (this.data.id) {
      shift.id = this.data.id;
      super.subscribeUpdate(shift);
    } else {
      super.subscribeSave(shift);
    }
  }
}
