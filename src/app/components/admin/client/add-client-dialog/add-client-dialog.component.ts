import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {GenderEnum} from '../../../../enums/GenderEnum';
import {CountryService} from '../../../../service/country.service';
import {Country} from '../../../../models/country';
import {NotificationEnum} from '../../../../enums/NotificationEnum';
import {ReferralSourceService} from '../../../../service/referral-source.service';
import {ReferralSource} from '../../../../models/referral-source';
import {CityService} from '../../../../service/city.service';
import {City} from '../../../../models/city';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.sass']
})
export class AddClientDialogComponent implements OnInit {

  listOfNotificationMethods: string[] = [NotificationEnum.EMAIL];
  listOfCountries: Country[] = [];
  listOfCities: City[] = [];
  listOfReferralSources: ReferralSource[] = [];
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

  addressForm = new FormGroup({
    street: new FormControl(''),
    number: new FormControl(''),
    city: new FormControl(''),
  });

  streetInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.STREET_FORM_CONTROL};
  citySelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.CITY_FORM_CONTROL};
  streetNoInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.NUMBER_FORM_CONTROL};
  firstNameInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.FIRST_NAME_FORM_CONTROL};
  lastNameInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.LAST_NAME_FORM_CONTROL};
  telephoneInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.TELEPHONE_FORM_CONTROL};
  emailInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.EMAIL_FORM_CONTROL};
  genderSelectConfig: FieldConfig = {
    type: InputTypes.SELECT_TYPE_NAME,
    name: FormControlNames.GENDER_FORM_CONTROL,
    options: [GenderEnum.MALE, GenderEnum.FEMALE]
  };
  notesInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.NOTES_FORM_CONTROL};

  notificationMethodSelectConfig: FieldConfig = {
    type: InputTypes.SELECT_TYPE_NAME,
    name: FormControlNames.NOTIFICATION_METHOD_FORM_CONTROL,
    options: [{name: NotificationEnum.EMAIL}]
  };
  languageSelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.LANGUAGE_FORM_CONTROL};
  referralSourceSelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.REFERRAL_SOURCE_FORM_CONTROL};

  constructor(private countryService: CountryService, private cityService: CityService,
              private referralSourceService: ReferralSourceService) {
  }

  ngOnInit(): void {
    this.getAllCountries();
    this.getAllReferralSources();
    this.getAllCities();
  }

  getAllCountries(): void {
    this.countryService.getAll().subscribe((resp) => {
      this.listOfCountries = resp;
      this.languageSelectConfig.options = resp;
    });
  }

  getAllReferralSources(): void {
    this.referralSourceService.getAll().subscribe((resp) => {
      this.listOfReferralSources = resp;
      this.referralSourceSelectConfig.options = resp;
    });
  }

  getAllCities(): void {
    this.cityService.getAll().subscribe((resp) => {
      this.listOfCities = resp;
      this.citySelectConfig.options = resp;
    });
  }
}
