import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../models/FIeldConfig';
import {MatSpinner} from '@angular/material/progress-spinner';
import {FormControlNames, InputTypes, Token} from '../../const/const';
import {User} from '../../models/user';
import {first} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {SpinnerService} from '../../service/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  usernameInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.USERNAME_NAME_FORM_CONTROL};
  passwordInputConfig: FieldConfig = {type: InputTypes.PASSWORD_TYPE_NAME, name: FormControlNames.PASSWORD_NAME_FORM_CONTROL};


  constructor(private authService: AuthService, private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
  }

  auth(): void {
    this.spinnerService.show(this.spinner);
    this.authService.auth(this.loginForm.getRawValue()).subscribe((resp) => {
      console.log(resp.headers.get(Token.HEADER_NAME));
      this.spinnerService.hide(this.spinner);
    });
  }
}
