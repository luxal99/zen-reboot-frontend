import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {StaffService} from '../../../../service/staff.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Staff} from '../../../../models/staff';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DefaultComponent} from '../../../../util/default-component';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes, Message} from '../../../../const/const';
import {CountryService} from '../../../../service/country.service';
import {Country} from '../../../../models/country';
import {MatSpinner} from '@angular/material/progress-spinner';
import {ContactTypeEnum} from '../../../../enums/ContactTypeEnum';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarUtil} from '../../../../util/snack-bar-uitl';

@Component({
  selector: 'app-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrls: ['./add-staff-dialog.component.sass']
})
export class AddStaffDialogComponent extends DefaultComponent<Staff> implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfCountries: Country[] = [];
  staffForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobilePhone: new FormControl(),
    mobilePhonePrefix: new FormControl(),
    email: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required)
  });

  firstNameInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.FIRST_NAME_FORM_CONTROL};
  lastNameInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.LAST_NAME_FORM_CONTROL};
  emailInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.EMAIL_FORM_CONTROL};

  constructor(@Inject(MAT_DIALOG_DATA) public data: Staff, private staffService: StaffService,
              private countryService: CountryService, private snackBar: MatSnackBar) {
    super(staffService);
  }

  save(): void {
    if (this.staffForm.valid) {
      this.spinnerService.show(this.spinner);
      const staff: Staff = {
        color: this.staffForm.get(FormControlNames.COLOR_FORM_CONTROL)?.value.hex,
        person: {
          firstName: this.staffForm.get(FormControlNames.FIRST_NAME_FORM_CONTROL)?.value,
          lastName: this.staffForm.get(FormControlNames.FIRST_NAME_FORM_CONTROL)?.value,
          contacts: [
            {
              type: ContactTypeEnum.PHONE,
              value: this.staffForm.get(FormControlNames.MOBILE_PHONE_FORM_CONTROL)?.value,
              prefix: this.staffForm.get(FormControlNames.MOBILE_PHONE_PREFIX_FORM_CONTROL)?.value
            },
            {
              type: ContactTypeEnum.EMAIL,
              value: this.staffForm.get(FormControlNames.EMAIL_FORM_CONTROL)?.value,
            }
          ],
        }
      };
      this.staffService.save(staff).subscribe(() => {
        this.spinnerService.hide(this.spinner);
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      }, (err) => {
        console.log(err);
        this.spinnerService.hide(this.spinner);

        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      });
    } else {
      SnackBarUtil.openSnackBar(this.snackBar, 'Popunite obavezna polja');
    }
  }

  getAllCountries(): void {
    this.countryService.getAll().subscribe((resp) => {
      this.listOfCountries = resp;
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getAllCountries();
  }

}
