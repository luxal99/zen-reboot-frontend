import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Appointment} from '../../../../models/appointment';
import * as moment from 'moment';
import {ContactTypeEnum} from '../../../../enums/ContactTypeEnum';

@Component({
  selector: 'app-appointment-overview-dialog',
  templateUrl: './appointment-overview-dialog.component.html',
  styleUrls: ['./appointment-overview-dialog.component.sass']
})
export class AppointmentOverviewDialogComponent implements OnInit {

  clientContactNumber = '';
  day = moment(this.data.date).format('dddd');

  constructor(@Inject(MAT_DIALOG_DATA) public data: Appointment) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.formatAppointment();
  }

  getClientContactNumber(): void {
    // @ts-ignore
    this.clientContactNumber = this.data.client?.person?.contacts?.find((contact) => contact.type === ContactTypeEnum.PHONE.toString());
  }

  formatAppointment(): void {
    this.data.date = moment(this.data.date).format('DD MMMM YYYY');
    this.data.createdDate = moment(this.data.createdDate).format('DD MMMM YYYY HH:mm');
  }

}
