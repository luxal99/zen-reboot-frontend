import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StaffService} from '../../../service/staff.service';
import {SpinnerService} from '../../../service/spinner.service';
import {Staff} from '../../../models/staff';
import {MatSpinner} from '@angular/material/progress-spinner';
import {DialogUtil} from '../../../util/dialog-util';
import {AddStaffDialogComponent} from './add-staff-dialog/add-staff-dialog.component';
import {DefaultComponent} from '../../../util/default-component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.sass']
})
export class StaffComponent extends DefaultComponent<Staff> implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfStaffs: Staff[] = [];

  constructor(private dialog: MatDialog, private staffService: StaffService) {
    super(staffService);
  }

  ngOnInit(): void {
    super.ngOnInit();
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
