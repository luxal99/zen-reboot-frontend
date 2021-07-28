import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../models/util/FIeldConfig';
import {MatSpinner} from '@angular/material/progress-spinner';
import {FormControlNames, InputTypes, TokenConst} from '../../const/const';
import {SpinnerService} from '../../service/spinner.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarUtil} from '../../util/snack-bar-uitl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  usernameInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.USERNAME_NAME_FORM_CONTROL};
  passwordInputConfig: FieldConfig = {type: InputTypes.PASSWORD_TYPE_NAME, name: FormControlNames.PASSWORD_NAME_FORM_CONTROL};


  constructor(private authService: AuthService, private router: Router,
              private spinnerService: SpinnerService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.addListener();
  }

  addListener(): void {
    document.getElementById('username')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.auth();
      }
    });

    document.getElementById('password')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.auth();
      }
    });
  }

  auth(): void {
    this.spinnerService.show(this.spinner);
    this.authService.auth(this.loginForm.getRawValue()).subscribe(async (resp) => {
      sessionStorage.setItem(TokenConst.NAME, resp.headers.get(TokenConst.NAME) as string);
      this.spinnerService.hide(this.spinner);
      await this.router.navigate(['/']);
    }, (err: HttpErrorResponse) => {
      SnackBarUtil.openSnackBar(this.snackBar, err.error);
      this.spinnerService.hide(this.spinner);
    });
  }
}
