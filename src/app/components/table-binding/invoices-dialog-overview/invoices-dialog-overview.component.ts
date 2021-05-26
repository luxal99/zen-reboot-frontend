import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Invoice} from '../../../models/invoice';
import * as moment from 'moment';

@Component({
  selector: 'app-invoices-dialog-overview',
  templateUrl: './invoices-dialog-overview.component.html',
  styleUrls: ['./invoices-dialog-overview.component.sass']
})
export class InvoicesDialogOverviewComponent implements OnInit {

  date = moment(this.data.date).format('DD MMMM YYYY');

  constructor(@Inject(MAT_DIALOG_DATA) public data: Invoice) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.formatAppointmentDate();
  }

  formatAppointmentDate(): void {
    this.data.appointments?.forEach((appointment) => appointment.date = moment(appointment.date).format('DD MMMM YYYY'));
  }
}
