import {Component, Inject, Input, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {CreateUserDto} from '../../../../models/create-user-dto';
import {UserService} from '../../../../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from '../../../../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {RoleService} from '../../../../service/role.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.sass']
})
export class AddUserDialogComponent extends DefaultComponent<User> implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    roles: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
  });

  usernameInputConfig: FieldConfig = {name: FormControlNames.USERNAME_NAME_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  emailInputConfig: FieldConfig = {name: FormControlNames.USERNAME_NAME_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  firstNameInputConfig: FieldConfig = {name: FormControlNames.USERNAME_NAME_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  lastNameInputConfig: FieldConfig = {name: FormControlNames.USERNAME_NAME_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  colorInputConfig: FieldConfig = {name: FormControlNames.COLOR_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  rolesSelectConfig: FieldConfig = {name: FormControlNames.USERNAME_NAME_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};

  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private userService: UserService, protected snackBar: MatSnackBar,
              private roleService: RoleService) {
    super(userService, snackBar);
  }

  ngOnInit(): void {
    this.initSelect();
  }

  initSelect(): void {
    super.initSelectConfig(this.roleService, this.rolesSelectConfig);
  }

  save(): void {

  }

}
