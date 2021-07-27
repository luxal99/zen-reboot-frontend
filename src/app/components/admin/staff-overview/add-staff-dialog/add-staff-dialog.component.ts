import {AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from "@angular/core";
import {StaffService} from "../../../../service/staff.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Staff} from "../../../../models/staff";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DefaultComponent} from "../../../../util/default-component";
import {FieldConfig} from "../../../../models/FIeldConfig";
import {EMAIL_REGEX, FormControlNames, InputTypes} from "../../../../const/const";
import {CountryService} from "../../../../service/country.service";
import {Country} from "../../../../models/country";
import {MatSpinner} from "@angular/material/progress-spinner";
import {ContactTypeEnum} from "../../../../enums/ContactTypeEnum";
import {SnackBarUtil} from "../../../../util/snack-bar-uitl";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Contact} from "../../../../models/contact";
import * as moment from "moment";
import {SalaryCategoryService} from "../../../../service/salary-category.service";

@Component({
  selector: "app-add-staff-dialog",
  templateUrl: "./add-staff-dialog.component.html",
  styleUrls: ["./add-staff-dialog.component.sass"]
})
export class AddStaffDialogComponent extends DefaultComponent<Staff> implements OnInit, AfterViewChecked {


  emailValue: Contact = {};
  telephoneValue: Contact = {};
  @ViewChild("spinner") spinner!: MatSpinner;
  listOfCountries: Country[] = [];
  staffForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    mobilePhone: new FormControl(),
    mobilePhonePrefix: new FormControl(),
    email: new FormControl("", Validators.pattern(EMAIL_REGEX)),
    color: new FormControl("", Validators.required),
    startDate: new FormControl(this.data ? new Date(this.data.startDate ? this.data.startDate : "") : ""),
    endDate: new FormControl(this.data ? new Date(this.data.endDate ? this.data.endDate : "") : ""),
    salaryCategory: new FormControl("")
  });

  firstNameInputConfig: FieldConfig = {
    type: InputTypes.INPUT_TYPE_NAME,
    name: FormControlNames.FIRST_NAME_FORM_CONTROL
  };
  lastNameInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.LAST_NAME_FORM_CONTROL};
  emailInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.EMAIL_FORM_CONTROL};
  startDateConfig: FieldConfig = {
    type: InputTypes.INPUT_TYPE_NAME,
    name: FormControlNames.START_DATE_FORM_CONTROL,
    label: "Početak radnog odnosa"
  };
  endDateConfig: FieldConfig = {
    type: InputTypes.INPUT_TYPE_NAME,
    name: FormControlNames.END_DATE_FORM_CONTROL,
    label: "Kraj radnog odnosa"
  };
  salaryCategorySelectConfig: FieldConfig = {
    type: InputTypes.INPUT_TYPE_NAME,
    name: FormControlNames.SALARY_CATEGORY_FORM_CONTROL
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Staff, private staffService: StaffService,
              private countryService: CountryService, protected snackBar: MatSnackBar,
              private readonly changeDetectorRef: ChangeDetectorRef, private salaryCategoryService: SalaryCategoryService) {
    super(staffService, snackBar);
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.getAllCountries();
    this.setValuesToForm();
    super.initSelectConfig(this.salaryCategoryService, this.salaryCategorySelectConfig);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }


  setValuesToForm(): void {
    if (this.data) {
      // @ts-ignore
      this.emailValue = this.data.person?.contacts.find((contact) => contact.type === ContactTypeEnum.EMAIL.toString()) || null;
      // @ts-ignore
      this.telephoneValue = this.data.person?.contacts.find((contact) => contact.type === ContactTypeEnum.PHONE.toString());
    } else {
      this.data = {};
    }
  }

  save(): void {
    if (this.staffForm.valid) {
      const staff: Staff = {
        color: this.staffForm.get(FormControlNames.COLOR_FORM_CONTROL)?.value.hex,
        startDate: this.staffForm.get(FormControlNames.START_DATE_FORM_CONTROL)?.value ?
          moment(this.staffForm.get(FormControlNames.START_DATE_FORM_CONTROL)?.value).format("YYYY-MM-DD") : undefined,
        endDate: this.staffForm.get(FormControlNames.END_DATE_FORM_CONTROL)?.value ?
          moment(this.staffForm.get(FormControlNames.END_DATE_FORM_CONTROL)?.value).format("YYYY-MM-DD") : undefined,
        person: {
          firstName: this.staffForm.get(FormControlNames.FIRST_NAME_FORM_CONTROL)?.value,
          lastName: this.staffForm.get(FormControlNames.LAST_NAME_FORM_CONTROL)?.value,
          contacts: [
            {
              id: this.telephoneValue ? this.telephoneValue.id : undefined,
              type: ContactTypeEnum.PHONE,
              value: this.staffForm.get(FormControlNames.MOBILE_PHONE_FORM_CONTROL)?.value,
              prefix: this.staffForm.get(FormControlNames.MOBILE_PHONE_PREFIX_FORM_CONTROL)?.value
            },
            {
              // @ts-ignore
              id: this.emailValue ? this.emailValue.id : null,
              type: ContactTypeEnum.EMAIL,
              value: this.staffForm.get(FormControlNames.EMAIL_FORM_CONTROL)?.value,
            }
          ],
        },
        salaryCategory: this.staffForm.get(FormControlNames.SALARY_CATEGORY_FORM_CONTROL)?.value
      };

      if (this.data.id) {
        staff.id = this.data.id;
        if (this.staffForm.get(FormControlNames.COLOR_FORM_CONTROL)?.value.hex) {
          staff.color = "#" + this.staffForm.get(FormControlNames.COLOR_FORM_CONTROL)?.value.hex;
        } else {
          staff.color = this.staffForm.get(FormControlNames.COLOR_FORM_CONTROL)?.value;
        }
        super.subscribeUpdate(staff);
      } else {
        super.subscribeSave(staff);
      }
    } else {
      SnackBarUtil.openSnackBar(this.snackBar, "Popunite obavezna polja");
    }
  }

  getAllCountries(): void {
    this.countryService.getAll().subscribe((resp) => {
      this.listOfCountries = resp;
    });
  }

}
