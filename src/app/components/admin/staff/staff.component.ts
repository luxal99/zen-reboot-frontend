import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StaffService} from '../../../service/staff.service';
import {SpinnerService} from '../../../service/spinner.service';
import {Staff} from '../../../models/staff';
import {MatSpinner} from '@angular/material/progress-spinner';
import {DialogUtil} from '../../../util/dialog-util';
import {AddStaffDialogComponent} from './add-staff-dialog/add-staff-dialog.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.sass']
})
export class StaffComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfStaffs: Staff[] = [];

  constructor(private dialog: MatDialog, private staffService: StaffService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.getAllStaffs();
  }

  getAllStaffs(): void {
    this.staffService.getAll().subscribe((staff) => {
      this.listOfStaffs = staff;
      this.spinnerService.hide(this.spinner);
    });
  }

  openAddStaffDialog(data?: Staff): void {
    DialogUtil.openDialog(AddStaffDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data
    }, this.dialog).afterClosed().subscribe(() => {
      this.getAllStaffs();
    });
  }

}
