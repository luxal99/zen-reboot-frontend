import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Client} from '../../../../models/client';
import {ClientService} from '../../../../service/client.service';
import {Contact} from '../../../../models/contact';
import {ContactTypeEnum} from '../../../../enums/ContactTypeEnum';
import {AppointmentDTO} from '../../../../models/AppointmentDTO';
import * as moment from 'moment';
import {AppointmentStatuses} from '../../../../const/const';
import {DialogUtil} from '../../../../util/dialog-util';
import {AddAppointmentDialogComponent} from '../../appointment/add-appointment-dialog/add-appointment-dialog.component';

@Component({
  selector: 'app-client-overview-dialog',
  templateUrl: './client-overview-dialog.component.html',
  styleUrls: ['./client-overview-dialog.component.sass']
})
export class ClientOverviewDialogComponent implements OnInit {

  mobilePhone: Contact = {};
  otherPhone: Contact = {};
  email: Contact = {};
  total = 0;
  numberOfCompleted = 0;
  numberOfCanceled = 0;
  listOfAppointments: AppointmentDTO [] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Client, public clientService: ClientService, private dialog: MatDialog) {
    // @ts-ignore
  }

  ngOnInit(): void {
    this.initDefault();
    this.getAppointments();
  }

  initDefault(): void {

  }

  openAddAppointmentDialog(): void {
    DialogUtil.openDialog(AddAppointmentDialogComponent, {
      position: {right: '0'},
      height: '100vh',
      width: '90%',
      maxWidth: '90%',
      data: {client: this.data}
    }, this.dialog);
  }

  getAppointments(): void {
    // @ts-ignore
    this.clientService.findAppointmentsForClient(this.data.id).subscribe((resp) => {
      // @ts-ignore
      this.listOfAppointments = resp;
      this.listOfAppointments.filter((appointment) => {
        appointment.date = moment(appointment.date);
        this.mobilePhone = this.data.person?.contacts?.find((contact) => contact.type === ContactTypeEnum.PHONE.toString()) || {};
        this.otherPhone = this.data.person?.contacts?.find((contact) => contact.type === ContactTypeEnum.OTHER.toString()) || {};
        this.email = this.data.person?.contacts?.find((contact) => contact.type === ContactTypeEnum.EMAIL.toString()) || {};
        // @ts-ignore
        this.total += appointment.price;

        if (appointment.appointmentStatus?.value?.toUpperCase() === AppointmentStatuses.CANCELED) {
          this.numberOfCanceled += 1;
        } else if (appointment.appointmentStatus?.value?.toUpperCase() === AppointmentStatuses.COMPLETED) {
          this.numberOfCompleted += 1;
        }
      });
    });
  }
}
