import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes, Message} from '../../../../const/const';
import {GenderEnum} from '../../../../enums/GenderEnum';
import {CountryService} from '../../../../service/country.service';
import {Country} from '../../../../models/country';
import {NotificationEnum} from '../../../../enums/NotificationEnum';
import {ReferralSourceService} from '../../../../service/referral-source.service';
import {ReferralSource} from '../../../../models/referral-source';
import {CityService} from '../../../../service/city.service';
import {City} from '../../../../models/city';
import {Client} from '../../../../models/client';
import {ContactTypeEnum} from '../../../../enums/ContactTypeEnum';
import {ClientService} from '../../../../service/client.service';
import {SpinnerService} from '../../../../service/spinner.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSpinner} from '@angular/material/progress-spinner';
import {SnackBarUtil} from '../../../../util/snack-bar-uitl';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.sass']
})
export class AddClientDialogComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfNotificationMethods: string[] = [NotificationEnum.EMAIL];
  listOfCountries: Country[] = [];
  listOfCities: City[] = [];
  listOfReferralSources: ReferralSource[] = [];
  @ViewChild('marketingNotificationCheckBox') marketingNotificationCheckBox!: MatCheckboxChange;
  personForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobilePhone: new FormControl(''),
    otherPhone: new FormControl(''),
    otherPhonePrefix: new FormControl(),
    mobilePhonePrefix: new FormControl(),
    email: new FormControl('')
  });
  clientForm = new FormGroup({
    notes: new FormControl(''),
    birthday: new FormControl(''),
    notificationMethod: new FormControl(''),
    referralSource: new FormControl(),
    gender: new FormControl(),
    language: new FormControl(),
  });

  addressForm = new FormGroup({
    street: new FormControl(''),
    number: new FormControl(''),
    city: new FormControl('', Validators.required),
  });

  streetInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.STREET_FORM_CONTROL};
  citySelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.CITY_FORM_CONTROL};
  streetNoInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.NUMBER_FORM_CONTROL};
  firstNameInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.FIRST_NAME_FORM_CONTROL};
  lastNameInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.LAST_NAME_FORM_CONTROL};
  mobilePrefixSelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.MOBILE_PHONE_PREFIX_FORM_CONTROL};
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
    options: [NotificationEnum.EMAIL]
  };
  languageSelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.LANGUAGE_FORM_CONTROL};
  referralSourceSelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.REFERRAL_SOURCE_FORM_CONTROL};

  constructor(private countryService: CountryService, private cityService: CityService,
              private spinnerService: SpinnerService, private snackBar: MatSnackBar,
              private referralSourceService: ReferralSourceService, private clientService: ClientService) {
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
      this.mobilePrefixSelectConfig.options = resp;
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

  save(): void {

    this.spinnerService.show(this.spinner);
    const client: Client = this.clientForm.getRawValue();
    client.person = this.personForm.getRawValue();
    client.address = this.addressForm.getRawValue();
    client.language = this.clientForm.get(FormControlNames.LANGUAGE_FORM_CONTROL)?.value;
    client.marketingNotifications = this.marketingNotificationCheckBox.checked;

    client.notificationMethod = this.clientForm.get(FormControlNames.NOTIFICATION_METHOD_FORM_CONTROL)?.value;
    client.gender = this.clientForm.get(FormControlNames.GENDER_FORM_CONTROL)?.value;
    // @ts-ignore
    client.person?.contacts = [
      {
        value: this.personForm.get(FormControlNames.MOBILE_PHONE_PREFIX_FORM_CONTROL)?.value +
          this.personForm.get(FormControlNames.MOBILE_PHONE_FORM_CONTROL)?.value,
        type: ContactTypeEnum.PHONE
      },
      {
        value: this.personForm.get(FormControlNames.OTHER_PHONE_PREFIX_FORM_CONTROL)?.value +
          this.personForm.get(FormControlNames.OTHER_PHONE_FORM_CONTROL)?.value, type: ContactTypeEnum.OTHER
      },
    ];
    this.clientService.save(client).subscribe(() => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });

  }
}
