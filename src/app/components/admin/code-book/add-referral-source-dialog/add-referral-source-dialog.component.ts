import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes, Message} from '../../../../const/const';
import {ReferralSourceService} from '../../../../service/referral-source.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarUtil} from '../../../../util/snack-bar-uitl';
import {MatSpinner} from '@angular/material/progress-spinner';
import {SpinnerService} from '../../../../service/spinner.service';

@Component({
  selector: 'app-add-referral-source-dialog',
  templateUrl: './add-referral-source-dialog.component.html',
  styleUrls: ['./add-referral-source-dialog.component.sass']
})
export class AddReferralSourceDialogComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  referralSourceForm = new FormGroup({
    value: new FormControl('', Validators.required)
  });

  valueInputConfig: FieldConfig = {name: FormControlNames.VALUE_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};

  constructor(private referralSourceService: ReferralSourceService,
              private spinnerService: SpinnerService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  save(): void {
    this.spinnerService.show(this.spinner);
    this.referralSourceService.save(this.referralSourceForm.getRawValue()).subscribe(() => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });
  }

}
