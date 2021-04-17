import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Appointment} from '../../../../models/appointment';
import * as moment from 'moment';

@Component({
  selector: 'app-appointment-overview-dialog',
  templateUrl: './appointment-overview-dialog.component.html',
  styleUrls: ['./appointment-overview-dialog.component.sass']
})
export class AppointmentOverviewDialogComponent implements OnInit {

  day = moment(this.data.date).format('dddd');

  constructor(@Inject(MAT_DIALOG_DATA) public data: Appointment) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.formatAppointment();
  }

  formatAppointment(): void {
    this.data.date = moment(this.data.date).format('DD MMMM YYYY');
    this.data.createdDate = moment(this.data.createdDate).format('DD MMMM YYYY HH:mm');
  }

}
