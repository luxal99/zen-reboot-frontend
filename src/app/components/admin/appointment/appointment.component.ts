import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {AddAppointmentDialogComponent} from './add-appointment-dialog/add-appointment-dialog.component';
import {StaffService} from '../../../service/staff.service';
import {StaffDto} from '../../../models/staff-dto';
import {CriteriaBuilder} from '../../../util/criteria-builder';
import * as moment from 'moment';
import {CalendarOptions} from '@fullcalendar/angular';
import {Appointment} from '../../../models/appointment';
import {AppointmentDTO} from '../../../models/AppointmentDTO';
import {DefaultComponent} from '../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.sass']
})
export class AppointmentComponent extends DefaultComponent<Appointment> implements OnInit {
  listOfSchedule: StaffDto[] = [];
  listOfTimes: string[] = [];


  appointment: AppointmentDTO = {};
  now = new Date();
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridDay',
    events: [
      {title: 'EVENT', date: '2021-04-16', startTime: '17:00:00', endTime: '18:00:00'},
    ]
  };

  handleDateClick(arg: any): void {
    alert('date click! ' + arg.dateStr);
  }

  constructor(private dialog: MatDialog, private staffService: StaffService, protected snackBar: MatSnackBar) {
    super(staffService, snackBar);
  }

  ngOnInit(): void {
    this.getAppointments();
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
    const queryBuilder = new CriteriaBuilder();
    const today = moment().format('YYYY-MM-DD');
    queryBuilder.eq('date', new Date(today).valueOf());
    this.staffService.getStaffsAppointments(queryBuilder.buildUrlEncoded()).subscribe((resp) => {
      this.listOfSchedule = resp.splice(0, 10);
      this.spinnerService.hide(this.spinner);
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
