import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';

@Component({
  selector: 'app-add-referral-source-dialog',
  templateUrl: './add-referral-source-dialog.component.html',
  styleUrls: ['./add-referral-source-dialog.component.sass']
})
export class AddReferralSourceDialogComponent implements OnInit {

  referralSourceForm = new FormGroup({
    value: new FormControl('', Validators.required)
  });

  valueInputConfig: FieldConfig = {name: FormControlNames.VALUE_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};

  constructor() {
  }

  ngOnInit(): void {
  }

}
