import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../util/default-component';
import {User} from '../../../models/entity/user';
import {UserService} from '../../../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup} from '@angular/forms';
import {DialogUtil} from '../../../util/dialog-util';
import {AddUserDialogComponent} from './add-user-dialog/add-user-dialog.component';
import {setDialogConfig} from '../../../util/dialog-options';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarUtil} from '../../../util/snack-bar-uitl';
import {Message} from '../../../const/const';

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

  openAddUserDialog(data?: User): void {
    DialogUtil.openDialog(AddUserDialogComponent, setDialogConfig({
      maxWidth: '40%',
      width: '30%',
      data
    }), this.dialog).afterClosed().subscribe(() => {
      this.getItems();
    });

  }

  resetPassword(id: number): void {
    this.spinnerService.show(this.spinner);
    this.userService.resetPassword(id).subscribe(() => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });
  }
}
