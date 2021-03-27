import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {GenderEnum} from '../../../../enums/GenderEnum';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.sass']
})
export class AddClientDialogComponent implements OnInit {

  listOfGenders: string[] = [GenderEnum.MALE, GenderEnum.FEMALE];
  clientForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    notificationMethod: new FormControl('', Validators.required),
    referralSource: new FormControl(),
    gender: new FormControl(),
    language: new FormControl(),
  });

  streetInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.STREET_FORM_CONTROL};
  municipalitySelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.CITY_FORM_CONTROL};
  streetNoInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.NUMBER_FORM_CONTROL};
  firstNameInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.FIRST_NAME_FORM_CONTROL};
  lastNameInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.LAST_NAME_FORM_CONTROL};
  telephoneInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.TELEPHONE_FORM_CONTROL};
  emailInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.EMAIL_FORM_CONTROL};

  constructor() {
  }

  ngOnInit(): void {
  }

}
