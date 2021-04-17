import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Appointment} from '../../../../models/appointment';

@Component({
  selector: 'app-appointment-overview-dialog',
  templateUrl: './appointment-overview-dialog.component.html',
  styleUrls: ['./appointment-overview-dialog.component.sass']
})
export class AppointmentOverviewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Appointment) {
  }

  ngOnInit(): void {
  }

}
