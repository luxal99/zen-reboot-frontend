import {AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
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
import {Client} from '../../../../models/client';
import {ContactTypeEnum} from '../../../../enums/ContactTypeEnum';
import {ClientService} from '../../../../service/client.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSpinner} from '@angular/material/progress-spinner';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DefaultComponent} from '../../../../util/default-component';
import * as moment from 'moment';
import {CKEditorComponent} from '@ckeditor/ckeditor5-angular';
// @ts-ignore
import * as ClassicEditor from 'lib/ckeditor5-build-classic';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.sass']
})
export class AddClientDialogComponent extends DefaultComponent<Client> implements OnInit, AfterViewChecked {

  mobilePhone = '';
  otherPhone = '';
  email = '';
  @ViewChild('editor', {static: false}) editorComponent!: CKEditorComponent;
  public Editor = ClassicEditor;

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
              protected snackBar: MatSnackBar, private readonly changeDetectorRef: ChangeDetectorRef,
              private referralSourceService: ReferralSourceService, private clientService: ClientService) {
    super(clientService, snackBar);
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
    client.person = {
      firstName: this.personForm.get(FormControlNames.FIRST_NAME_FORM_CONTROL)?.value,
      lastName: this.personForm.get(FormControlNames.LAST_NAME_FORM_CONTROL)?.value,
      contacts: []
    };
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

    client.birthday = moment(client.birthday).format('YYYY-MM-DD');
    client.notes = this.editorComponent.editorInstance?.getData();
    if (this.data.id) {
      client.id = this.data.id;
      super.subscribeUpdate(client);
    } else {
      super.subscribeSave(client);
    }
  }

  setValuesToForm(): void {
    if (this.data) {
      this.personForm.controls.otherPhonePrefix
        .setValue(this.data.person?.contacts.find((telephone) => telephone.type === ContactTypeEnum.OTHER.toString())?.prefix || '');
      this.personForm.controls.mobilePhonePrefix
        .setValue(this.data.person?.contacts.find((telephone) => telephone.type === ContactTypeEnum.PHONE.toString())?.prefix || '');
      // @ts-ignore
      this.email = this.data.person?.contacts.find((telephone) => telephone.type === ContactTypeEnum.EMAIL.toString()).value;

      this.personForm.controls.otherPhone
        .setValue(this.data.person?.contacts.find((telephone) => telephone.type === ContactTypeEnum.OTHER.toString())?.value || '');
      this.personForm.controls.mobilePhone
        .setValue(this.data.person?.contacts.find((telephone) => telephone.type === ContactTypeEnum.PHONE.toString())?.value || '');
    } else {
      this.data = {};
    }
  }
}
