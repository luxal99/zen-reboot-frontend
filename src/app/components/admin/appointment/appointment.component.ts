import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {AddAppointmentDialogComponent} from './add-appointment-dialog/add-appointment-dialog.component';
import {StaffService} from '../../../service/staff.service';
import {StaffDto} from '../../../models/staff-dto';
import {CriteriaBuilder} from '../../../util/criteria-builder';
import * as moment from 'moment';
import {Appointment} from '../../../models/appointment';
import {DefaultComponent} from '../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.sass']
})
export class AppointmentComponent extends DefaultComponent<Appointment> implements OnInit {
  listOfSchedule: StaffDto[] = [];
  listOfTimes: string[] = [];
  now = new Date();
  currentDate = moment();
  searchForm = new FormGroup({
    search: new FormControl()
  });

  searchText = '';

  constructor(private dialog: MatDialog, private staffService: StaffService, protected snackBar: MatSnackBar) {
    super(staffService, snackBar);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getAppointments();
    }, 100);
    this.getTimes();
  }

  getTimes(): void {
    const start = moment('09:00:00', 'HH:mm:ss');
    const end = moment('21:59:59', 'HH:mm:ss');
    while (start.isSameOrBefore(end)) {
      this.listOfTimes.push(start.add(15, 'm').format('HH:mm'));
    }
  }

  getAppointments(): void {
    this.spinnerService.show(this.spinner);
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.eq('date', new Date(this.currentDate.format('YYYY-MM-DD')).valueOf());
    this.staffService.getStaffsAppointments(queryBuilder.buildUrlEncoded()).subscribe((resp) => {
      this.listOfSchedule = resp.splice(0, 10);
      this.spinnerService.hide(this.spinner);
    });
  }

  openAddAppointmentDialog(): void {
    DialogUtil.openDialog(AddAppointmentDialogComponent, {
      position: {right: '0'},
      height: '100vh',
      width: '40%',
      maxWidth: '50%'
    }, this.dialog);
  }

  nextDay(): void {
    this.currentDate = this.currentDate.add(1, 'd');
    this.getAppointments();
  }

  previousDay(): void {
    this.currentDate = this.currentDate.subtract(1, 'd');
    this.getAppointments();
  }

  test($event: Event) {
    console.log(event);
  }
}
