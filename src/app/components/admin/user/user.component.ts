import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../util/default-component';
import {User} from '../../../models/user';
import {UserService} from '../../../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup} from '@angular/forms';

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

  constructor(private userService: UserService, protected snackBar: MatSnackBar) {
    super(userService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
