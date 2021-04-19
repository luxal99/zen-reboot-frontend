import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Appointment} from '../../../../models/appointment';
import * as moment from 'moment';
import {ContactTypeEnum} from '../../../../enums/ContactTypeEnum';
import {Contact} from '../../../../models/contact';
import {DefaultComponent} from '../../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppointmentService} from '../../../../service/appointment.service';
import {DialogUtil} from '../../../../util/dialog-util';
import {AddAppointmentDialogComponent} from '../add-appointment-dialog/add-appointment-dialog.component';

@Component({
  selector: 'app-appointment-overview-dialog',
  templateUrl: './appointment-overview-dialog.component.html',
  styleUrls: ['./appointment-overview-dialog.component.sass']
})
export class AppointmentOverviewDialogComponent extends DefaultComponent<Appointment> implements OnInit {

  clientContactNumber: Contact = {};
  day = moment(this.data.date).format('dddd');

  constructor(@Inject(MAT_DIALOG_DATA) public data: Appointment, private dialog: MatDialog,
              protected snackBar: MatSnackBar, private appointmentService: AppointmentService) {
    super(appointmentService, snackBar);
  }

  ngOnInit(): void {
    console.log(this.data);
    this.formatAppointment();
    this.getClientContactNumber();
  }

  getClientContactNumber(): void {
    // @ts-ignore
    this.clientContactNumber = this.data.client?.person?.contacts?.find((contact) => contact.type === ContactTypeEnum.PHONE.toString());
  }

  formatAppointment(): void {
    this.data.date = moment(this.data.date).format('DD MMMM YYYY');
    this.data.createdDate = moment(this.data.createdDate).format('DD MMMM YYYY HH:mm');
  }

  openEditAppointmentDialog(): void {
    DialogUtil.openDialog(AddAppointmentDialogComponent, {
      position: {right: '0'},
      height: '100vh',
      width: '40%',
      maxWidth: '50%',
      data: this.data
    }, this.dialog);
  }

  deleteAppointment(): void {
    // @ts-ignore
    super.subscribeDelete(this.data.id);

  }

}
