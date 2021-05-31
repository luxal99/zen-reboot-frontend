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
    lastName: new FormControl('', Validators.required),
    roles: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
  });

  usernameInputConfig: FieldConfig = {name: FormControlNames.USERNAME_NAME_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  emailInputConfig: FieldConfig = {name: FormControlNames.EMAIL_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  firstNameInputConfig: FieldConfig = {name: FormControlNames.FIRST_NAME_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  lastNameInputConfig: FieldConfig = {name: FormControlNames.LAST_NAME_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  rolesSelectConfig: FieldConfig = {name: FormControlNames.ROLES_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};

  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private userService: UserService, protected snackBar: MatSnackBar) {
    super(userService, snackBar);
  }

  ngOnInit(): void {
    this.initSelect();
  }

  initSelect(): void {
    super.initSelectConfigWithObservable(this.userService.getUserRoles(), this.rolesSelectConfig);
  }

  save(): void {
    if (!this.data) {
      const user = this.userForm.getRawValue();
      user.color = user.color.hex;
      this.subscribeSave(user);
    } else {
      this.subscribeUpdate({
        id: this.data.id,
        username: this.userForm.get(FormControlNames.USERNAME_NAME_FORM_CONTROL)?.value
      });

    }
  }

}
