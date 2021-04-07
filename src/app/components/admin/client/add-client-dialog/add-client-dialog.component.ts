import {AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
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
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.sass']
})
export class AddClientDialogComponent implements OnInit, AfterViewChecked {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfNotificationMethods: string[] = [NotificationEnum.EMAIL];
  listOfCountries: Country[] = [];
  listOfCities: City[] = [];
  listOfReferralSources: ReferralSource[] = [];
  @ViewChild('marketingNotificationCheckBox') marketingNotificationCheckBox!: MatCheckboxChange;

  personForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    mobilePhone: new FormControl(),
    otherPhone: new FormControl(''),
    otherPhonePrefix: new FormControl(),
    mobilePhonePrefix: new FormControl(),
    email: new FormControl('')
  });
  clientForm = new FormGroup({
    notes: new FormControl(''),
    birthday: new FormControl(''),
    notificationMethod: new FormControl(''),
    referralSource: new FormControl('', Validators.required),
    gender: new FormControl(''),
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
  mobilePrefixSelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.MOBILE_PHONE_PREFIX_FORM_CONTROL};
  emailInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.EMAIL_FORM_CONTROL};
  genderSelectConfig: FieldConfig = {
    type: InputTypes.SELECT_TYPE_NAME,
    name: FormControlNames.GENDER_FORM_CONTROL,
    options: [{name: GenderEnum.MALE}, {name: GenderEnum.FEMALE}]
  };
  notesInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.NOTES_FORM_CONTROL};

  notificationMethodSelectConfig: FieldConfig = {
    type: InputTypes.SELECT_TYPE_NAME,
    name: FormControlNames.NOTIFICATION_METHOD_FORM_CONTROL,
    options: [{name: NotificationEnum.EMAIL}]
  };
  languageSelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.LANGUAGE_FORM_CONTROL};
  referralSourceSelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.REFERRAL_SOURCE_FORM_CONTROL};

  constructor(@Inject(MAT_DIALOG_DATA) public data: Client, private countryService: CountryService, private cityService: CityService,
              private spinnerService: SpinnerService, private snackBar: MatSnackBar, private readonly changeDetectorRef: ChangeDetectorRef,
              private referralSourceService: ReferralSourceService, private clientService: ClientService) {
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.getAllCountries();
    this.getAllReferralSources();
    this.getAllCities();
    this.setValuesToForm();
  }

  getAllCountries(): void {
    this.countryService.getAll().subscribe((resp) => {
      this.listOfCountries = resp;
      this.languageSelectConfig.options = resp.map((country) => ({
        name: country.name
      }));
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
    if (this.clientForm.get(FormControlNames.LANGUAGE_FORM_CONTROL)?.value) {
      client.language = this.clientForm.get(FormControlNames.LANGUAGE_FORM_CONTROL)?.value.name;
    }
    if (this.clientForm.get(FormControlNames.NOTIFICATION_METHOD_FORM_CONTROL)?.value) {
      client.notificationMethod = this.clientForm.get(FormControlNames.NOTIFICATION_METHOD_FORM_CONTROL)?.value.name;
    }
    client.marketingNotifications = this.marketingNotificationCheckBox.checked;

    if (this.clientForm.get(FormControlNames.GENDER_FORM_CONTROL)?.value) {
      client.gender = this.clientForm.get(FormControlNames.GENDER_FORM_CONTROL)?.value.name;
    }
    // @ts-ignore
    client.person?.contacts = [
      {
        prefix: this.personForm.get(FormControlNames.MOBILE_PHONE_PREFIX_FORM_CONTROL)?.value,
        value: this.personForm.get(FormControlNames.MOBILE_PHONE_FORM_CONTROL)?.value,
        type: ContactTypeEnum.PHONE
      },
      {
        prefix: this.personForm.get(FormControlNames.OTHER_PHONE_PREFIX_FORM_CONTROL)?.value,
        value: this.personForm.get(FormControlNames.OTHER_PHONE_FORM_CONTROL)?.value,
        type: ContactTypeEnum.OTHER
      },
      {
        value: this.personForm.get(FormControlNames.EMAIL_FORM_CONTROL)?.value,
        type: ContactTypeEnum.EMAIL
      },
    ];

    if (this.data.id) {
      client.id = this.data.id;
      const subs = this.clientService.update(client).subscribe(() => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
        this.spinnerService.hide(this.spinner);
      }, () => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
        this.spinnerService.hide(this.spinner);

      });

    } else {
      this.clientService.save(client).subscribe(() => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
        this.spinnerService.hide(this.spinner);
      }, () => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
        this.spinnerService.hide(this.spinner);
      });
    }
  }

  setValuesToForm(): void {
    if (this.data) {
      this.personForm.setValue({
        firstName: this.data.person?.firstName,
        lastName: this.data.person?.lastName,
        email: this.data.person?.contacts.find((telephone) => telephone.type === ContactTypeEnum.EMAIL.toString())?.value || '',
        mobilePhone: this.data.person?.contacts.find((telephone) => telephone.type === ContactTypeEnum.PHONE.toString())?.value || '',
        otherPhone: this.data.person?.contacts.find((telephone) => telephone.type === ContactTypeEnum.OTHER.toString())?.value || '',
        otherPhonePrefix: this.data.person?.contacts.find((telephone) => telephone.type === ContactTypeEnum.OTHER.toString())?.prefix || '',
        mobilePhonePrefix: this.data.person?.contacts.find((telephone) => telephone.type === ContactTypeEnum.PHONE.toString())?.prefix || '',
      });

      this.addressForm.setValue({
        street: this.data.address?.street || '',
        number: this.data.address?.number || '',
        city: this.data.address?.city || ''
      });

      this.clientForm.setValue({
        gender: this.data.gender,
        notificationMethod: this.data.notificationMethod,
        birthday: this.data.birthday,
        notes: this.data.notes,
        language: this.data.language,
        referralSource: this.data.referralSource

      });

    } else {
      this.data = {};
    }
  }
}
