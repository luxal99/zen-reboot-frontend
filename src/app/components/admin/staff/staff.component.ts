import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StaffService} from '../../../service/staff.service';
import {SpinnerService} from '../../../service/spinner.service';
import {Staff} from '../../../models/staff';
import {MatSpinner} from '@angular/material/progress-spinner';
import {DialogUtil} from '../../../util/dialog-util';
import {AddStaffDialogComponent} from './add-staff-dialog/add-staff-dialog.component';
import {DefaultComponent} from '../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ContactTypeEnum} from '../../../enums/ContactTypeEnum';
import {Contact} from '../../../models/contact';
import {FormControl, FormGroup} from '@angular/forms';
import {FieldConfig} from '../../../models/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../const/const';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.sass']
})
export class StaffComponent extends DefaultComponent<Staff> implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  searchText = '';
  searchInputConfig: FieldConfig = {name: FormControlNames.SEARCH_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};

  constructor(private dialog: MatDialog, private staffService: StaffService, protected snackBar: MatSnackBar) {
    super(staffService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
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
