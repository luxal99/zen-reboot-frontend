import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Shift} from '../../../../../models/shift';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DefaultComponent} from '../../../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShiftService} from '../../../../../service/shift.service';
import {FormControlNames, InputTypes} from '../../../../../const/const';
import {FieldConfig} from '../../../../../models/FIeldConfig';

@Component({
  selector: 'app-add-shift-dialog',
  templateUrl: './add-shift-dialog.component.html',
  styleUrls: ['./add-shift-dialog.component.sass']
})
export class AddShiftDialogComponent extends DefaultComponent<Shift> implements OnInit {

  shiftForm = new FormGroup({
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
  });

  startTimeInputConfig: FieldConfig = {name: FormControlNames.START_TIME_FORM_CONTROL, type: InputTypes.TIME};
  endTimeInputConfig: FieldConfig = {name: FormControlNames.END_TIME_FORM_CONTROL, type: InputTypes.TIME};

  constructor(@Inject(MAT_DIALOG_DATA) public data: Shift, protected snackBar: MatSnackBar, private shiftService: ShiftService) {
    super(shiftService, snackBar);
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  save(): void {
    this.data.startTime = this.shiftForm.get(FormControlNames.START_TIME_FORM_CONTROL)?.value;
    this.data.endTime = this.shiftForm.get(FormControlNames.END_TIME_FORM_CONTROL)?.value;

  }
}
