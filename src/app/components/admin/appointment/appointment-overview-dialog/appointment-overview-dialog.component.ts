import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Appointment} from '../../../../models/appointment';
import * as moment from 'moment';
import {ContactTypeEnum} from '../../../../enums/ContactTypeEnum';
import {Contact} from '../../../../models/contact';
import {DefaultComponent} from '../../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppointmentService} from '../../../../service/appointment.service';
import {DialogUtil} from '../../../../util/dialog-util';
import {AddAppointmentDialogComponent} from '../add-appointment-dialog/add-appointment-dialog.component';
import {AppointmentDTO} from '../../../../models/AppointmentDTO';
import {LocationService} from '../../../../service/location.service';
import {EditInvoiceDialogComponent} from './edit-invoice-dialog/edit-invoice-dialog.component';
import {RoleSettings} from '../../../../const/const';

@Component({
  selector: 'app-appointment-overview-dialog',
  templateUrl: './appointment-overview-dialog.component.html',
  styleUrls: ['./appointment-overview-dialog.component.sass'],
  providers: [RoleSettings]
})
export class AppointmentOverviewDialogComponent extends DefaultComponent<Appointment> implements OnInit {
  day = moment(this.data.date).format('dddd');

  constructor(@Inject(MAT_DIALOG_DATA) public data: AppointmentDTO, private dialog: MatDialog,
              protected snackBar: MatSnackBar, private dialogRef: MatDialogRef<AppointmentOverviewDialogComponent>,
              private appointmentService: AppointmentService, private locationService: LocationService,
              public roleSettings: RoleSettings) {
    super(appointmentService, snackBar);
  }

  ngOnInit(): void {
    this.formatAppointment();
    this.getLocation();
  }

  getLocation(): void {
    // @ts-ignore
    this.locationService.findById(this.data.room.location).subscribe((location) => {
      // @ts-ignore
      this.data.room?.location = location;
    });
  }

  formatAppointment(): void {
    this.data.date = moment(this.data.date).format('DD MMMM YYYY');
    this.data.createdDate = moment(this.data.createdDate).format('DD MMMM YYYY HH:mm');
  }

  openAddAppointmentDialog(): void {
    DialogUtil.openDialog(AddAppointmentDialogComponent, {
      position: {right: '0'},
      height: '100vh',
      width: '70%',
      maxWidth: '70%',
      data: this.data
    }, this.dialog).afterClosed().subscribe(() => {
      this.dialogRef.close();
    });
  }

  openEditInvoiceDialog(): void {
    DialogUtil.openDialog(EditInvoiceDialogComponent, {
      position: {right: '0'},
      height: '100vh',
      width: '50%',
      maxWidth: '50%',
      data: this.data
    }, this.dialog).afterClosed().subscribe(() => {
      this.dialogRef.close();
    });
  }

  deleteAppointment(): void {
    // @ts-ignore
    super.subscribeDelete(this.data.id);
  }

}
