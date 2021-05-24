import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {AppointmentStatus} from '../../../../models/appointment-status';
import {AppointmentStatusService} from '../../../../service/appointment-status.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-status-overview',
  templateUrl: './appointment-status-overview.component.html',
  styleUrls: ['./appointment-status-overview.component.sass']
})
export class AppointmentStatusOverviewComponent extends DefaultComponent<AppointmentStatus> implements OnInit {

  constructor(private appointmentStatusService: AppointmentStatusService, protected snackBar: MatSnackBar,
              ) {
    super(appointmentStatusService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }



}
