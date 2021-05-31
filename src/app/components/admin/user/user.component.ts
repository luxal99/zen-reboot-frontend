import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../util/default-component';
import {User} from '../../../models/user';
import {UserService} from '../../../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup} from '@angular/forms';
import {DialogUtil} from '../../../util/dialog-util';
import {AddUserDialogComponent} from './add-user-dialog/add-user-dialog.component';
import {setDialogConfig} from '../../../util/dialog-options';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent extends DefaultComponent<User> implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl('')
  });
  searchText = '';

  constructor(private userService: UserService, protected snackBar: MatSnackBar, private dialog: MatDialog) {
    super(userService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  openAddUserDialog(user?: User): void {
    DialogUtil.openDialog(AddUserDialogComponent, setDialogConfig({}), this.dialog).afterClosed().subscribe(() => {
      this.getItems();
    });

  }

}
