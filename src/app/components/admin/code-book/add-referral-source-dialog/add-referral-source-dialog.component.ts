import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes, Message} from '../../../../const/const';
import {ReferralSourceService} from '../../../../service/referral-source.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarUtil} from '../../../../util/snack-bar-uitl';
import {MatSpinner} from '@angular/material/progress-spinner';
import {SpinnerService} from '../../../../service/spinner.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReferralSource} from '../../../../models/referral-source';

@Component({
  selector: 'app-add-referral-source-dialog',
  templateUrl: './add-referral-source-dialog.component.html',
  styleUrls: ['./add-referral-source-dialog.component.sass']
})
export class AddReferralSourceDialogComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  referralSourceForm = new FormGroup({
    value: new FormControl(this.data.value, Validators.required)
  });

  valueInputConfig: FieldConfig = {name: FormControlNames.VALUE_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReferralSource, private referralSourceService: ReferralSourceService,
              private spinnerService: SpinnerService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  save(): void {

    const referralSource: ReferralSource = this.referralSourceForm.getRawValue();

    if (this.data === {}) {
      this.spinnerService.show(this.spinner);
      this.referralSourceService.save(referralSource).subscribe(() => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
        this.spinnerService.hide(this.spinner);
      }, () => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
        this.spinnerService.hide(this.spinner);
      });
    } else {
      referralSource.id = this.data.id;
      this.referralSourceService.update(referralSource).subscribe(() => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
        this.spinnerService.hide(this.spinner);
      }, () => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
        this.spinnerService.hide(this.spinner);
      });
    }
  }

}
