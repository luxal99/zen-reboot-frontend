import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {FieldConfig} from '../../../models/util/FIeldConfig';
import {FormControlNames, InputTypes, Message, PASSWORD_REGEX} from '../../../const/const';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSpinner} from '@angular/material/progress-spinner';
import {SpinnerService} from '../../../service/spinner.service';
import {SnackBarUtil} from '../../../util/snack-bar-uitl';
import {isNumeric} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.sass']
})
export class ChangePasswordDialogComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;

  changePasswordForm = new FormGroup({
    confirm: new FormControl('', Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')),
    current: new FormControl('', Validators.required),
    password: new FormControl('', Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
  });

  confirmInputConfig: FieldConfig = {type: InputTypes.PASSWORD_TYPE_NAME, name: FormControlNames.CONFIRM_FORM_CONTROL};
  currentInputConfig: FieldConfig = {type: InputTypes.PASSWORD_TYPE_NAME, name: FormControlNames.CURRENT_PASSWORD_FORM_CONTROL};
  passwordInputConfig: FieldConfig = {type: InputTypes.PASSWORD_TYPE_NAME, name: FormControlNames.PASSWORD_NAME_FORM_CONTROL};

  constructor(private userService: UserService, private snackBar: MatSnackBar, private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
  }

  changePassword(): void {
    this.spinnerService.show(this.spinner);
    this.userService.changePassword(this.changePasswordForm.getRawValue()).subscribe(() => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
    }, () => {
      this.spinnerService.hide(this.spinner);
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
    });
  }

  check(): void {
    const password: string = this.changePasswordForm.get(FormControlNames.PASSWORD_NAME_FORM_CONTROL)?.value;
    const minNum = document.getElementById('minNum');
    const minLength = document.getElementById('minLength');
    const upLetter = document.getElementById('upLetter');
    const hasNum = password.split('').filter((item) => isNumeric(item));
    if (hasNum.length > 0) {
      // @ts-ignore
      this.enable(minNum);
    } else {
      // @ts-ignore
      this.disable(minNum);
    }

    if (password.length >= 8) {
      // @ts-ignore
      this.enable(minLength);
    } else {
      // @ts-ignore
      this.disable(minLength);
    }

    if (password.match('(?=.*[A-Z])')) {
      // @ts-ignore
      this.enable(upLetter);
    } else {
      // @ts-ignore
      this.disable(upLetter);
    }
  }

  enable(element: HTMLElement): void {
    element.classList.add('success');
    element.classList.remove('silver');
  }

  disable(element: HTMLElement): void {
    element.classList.add('silver');
    element.classList.remove('success');
  }
}
