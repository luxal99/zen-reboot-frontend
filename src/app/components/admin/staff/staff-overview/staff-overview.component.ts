import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSpinner} from '@angular/material/progress-spinner';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {StaffService} from '../../../../service/staff.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Staff} from '../../../../models/staff';
import {Contact} from '../../../../models/contact';
import {ContactTypeEnum} from '../../../../enums/ContactTypeEnum';
import {DialogUtil} from '../../../../util/dialog-util';
import {AddStaffDialogComponent} from '../add-staff-dialog/add-staff-dialog.component';
import {DefaultComponent} from '../../../../util/default-component';

@Component({
  selector: 'app-staff-overview',
  templateUrl: './staff-overview.component.html',
  styleUrls: ['./staff-overview.component.sass']
})
export class StaffOverviewComponent extends DefaultComponent<Staff> implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  searchText = '';

  constructor(private dialog: MatDialog, private staffService: StaffService, protected snackBar: MatSnackBar) {
    super(staffService, snackBar);
  }

  ngOnInit(): void {
    setTimeout(() => {
      super.ngOnInit();
    }, 500);
  }

  getEmailForStaff(staff: Staff): Contact {
    const person = staff.person;
    // @ts-ignore
    return person?.contacts.find((contact) => contact.type === ContactTypeEnum.EMAIL.toString());
  }

  openAddStaffDialog(data?: Staff): void {
    DialogUtil.openDialog(AddStaffDialogComponent, {
      height: '100%',
      width: '40%',
      position: {right: '0'},
      data
    }, this.dialog).afterClosed().subscribe(() => {
      this.getItems();
    });
  }

}
