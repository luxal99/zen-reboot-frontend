import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {AddAppointmentDialogComponent} from './add-appointment-dialog/add-appointment-dialog.component';
import {StaffService} from '../../../service/staff.service';
import {StaffDto} from '../../../models/staff-dto';
import {CriteriaBuilder} from '../../../util/criteria-builder';
import * as moment from 'moment';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.sass']
})
export class AppointmentComponent implements OnInit {
  listOfSchedule: StaffDto[] = [];
  listOfTimes: string[] = [];
  now = new Date();
  events: CalendarEvent[] = [];

  constructor(private dialog: MatDialog, private staffService: StaffService) {
  }

  ngOnInit(): void {
    this.getAppointments();
    this.getTimes();
  }

  getTimes(): void {
    const start = moment('07:00:00', 'HH:mm:ss');
    const end = moment('23:59:59', 'HH:mm:ss');
    while (start.isSameOrBefore(end)) {
      this.listOfTimes.push(start.add(30, 'm').format('HH:mm'));
    }
  }

  getAppointments(): void {
    const queryBuilder = new CriteriaBuilder();
    const today = moment().format('YYYY-MM-DD');
    queryBuilder.eq('date', new Date(today).valueOf());
    this.staffService.getStaffsAppointments(queryBuilder.buildUrlEncoded()).subscribe((resp) => {
      console.log(resp);
      this.listOfSchedule = resp;
    });
  }

  setEvent(staffDto: StaffDto): void {
    // @ts-ignore
    for (const appointment of staffDto.appointments) {

      // @ts-ignore
      this.events.push({start: appointment.startTime, end: appointment.endTime});
    }
  }

  openAddAppointmentDialog(): void {
    DialogUtil.openDialog(AddAppointmentDialogComponent, {
      position: {right: '0'},
      height: '100vh',
      width: '40%',
      maxWidth: '50%'
    }, this.dialog);
  }
}
