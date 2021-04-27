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
import {RepeatTypeEnum} from '../../../../../enums/RepeatTypeEnum';
import {StaffDto} from '../../../../../models/staff-dto';

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
    location: new FormControl(),
  });

  repeatForm = new FormGroup({
    repeatType: new FormControl('', Validators.required),
    repeatCount: new FormControl('', Validators.required)
  });

  startTimeInputConfig: FieldConfig = {name: FormControlNames.START_TIME_FORM_CONTROL, type: InputTypes.TIME};
  endTimeInputConfig: FieldConfig = {name: FormControlNames.END_TIME_FORM_CONTROL, type: InputTypes.TIME};
  locationSelectConfig: FieldConfig = {name: FormControlNames.LOCATION_FORM_CONTROL, type: InputTypes.SELECT_TYPE_NAME};
  repeatTypeSelectConfig: FieldConfig = {
    type: InputTypes.SELECT_TYPE_NAME,
    name: FormControlNames.REPEAT_TYPE,
    options: [RepeatTypeEnum.MONTH, RepeatTypeEnum.WEEK]
  };
  repeatCountInputConfig: FieldConfig = {name: FormControlNames.REPEAT_COUNT_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};

  constructor(@Inject(MAT_DIALOG_DATA) public data: Shift, protected snackBar: MatSnackBar,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private shiftService: ShiftService, private locationService: LocationService) {
    super(shiftService, snackBar);
  }

  ngOnInit(): void {
    console.log(this.data);
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
    shift.staff = {id: this.data.staff?.id};
    shift.date = moment(this.data.date).format('YYYY-MM-DD');
    shift.location?.rooms?.filter((room) => delete room.location);

    if (this.repeatForm.valid) {
      const staffDto: StaffDto = {};
      Object.assign(staffDto, shift);
      staffDto.repeatCount = this.repeatForm.get(FormControlNames.REPEAT_COUNT_FORM_CONTROL)?.value;
      staffDto.repeatType = this.repeatForm.get(FormControlNames.REPEAT_TYPE)?.value;
      super.otherSubscribe(this.shiftService.generateMultipleShifts(staffDto));
    }
    if (this.data.id) {
      shift.id = this.data.id;
      super.subscribeUpdate(shift);
    } else {
      super.subscribeSave(shift);
    }

  }
}
