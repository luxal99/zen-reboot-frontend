import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {StaffService} from '../../../../service/staff.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Staff} from '../../../../models/staff';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DefaultComponent} from '../../../../util/default-component';
import {MatSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrls: ['./add-staff-dialog.component.sass']
})
export class AddStaffDialogComponent extends DefaultComponent implements OnInit {

  staffForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    telephone: new FormControl(),
    email: new FormControl(),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Staff, private staffService: StaffService) {
    super(staffService);
  }

  save(): void {
    const staff: Staff = {};
    this.staffService.save(staff).subscribe(() => {
    }, () => {
    });
  }

  ngOnInit(): void {
    this.getItems();
  }
}
