import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {AddAppointmentDialogComponent} from './add-appointment-dialog/add-appointment-dialog.component';
import {StaffService} from '../../../service/staff.service';
import {StaffDto} from '../../../models/staff-dto';
import {CriteriaBuilder} from '../../../util/criteria-builder';
import * as moment from 'moment';
import {Appointment} from '../../../models/appointment';
import {DefaultComponent} from '../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup} from '@angular/forms';
import {AppointmentOverviewDialogComponent} from './appointment-overview-dialog/appointment-overview-dialog.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.sass']
})
export class AppointmentComponent extends DefaultComponent<Appointment> implements OnInit {

  listOfSchedule: Observable<StaffDto[]> = new Observable<StaffDto[]>();
  filteredScheduleList: StaffDto[] = [];
  listOfTimes: string[] = [];

  currentDate = moment();

  searchForm = new FormGroup({
    search: new FormControl()
  });

  searchText = '';

  initGap = 0;
  gap = 10;

  isDisabledNext10 = false;
  isDisabledPrev10 = true;

  responseSize = 0;

  constructor(private dialog: MatDialog, private staffService: StaffService, protected snackBar: MatSnackBar) {
    super(staffService, snackBar);
  }

  ngOnInit(): void {
    setTimeout(async () => {
      this.getAppointments().then(() => {
        this.initDefault();
      });
    }, 100);
    this.getTimes();
  }

  initDefault(): void {
    this.listOfSchedule.pipe(map(value => value.slice(this.initGap, this.gap))).subscribe((resp) => {
      this.filteredScheduleList = resp;
    });
  }

  nextStaffs(): void {

    if (this.initGap + 10 < this.responseSize) {
      this.initGap += 10;
      this.gap += 10;
      this.listOfSchedule.pipe(map(value => value.slice(this.initGap, this.gap))).subscribe((resp) => {
        this.filteredScheduleList = resp;
      });
    }
    if (this.initGap > 0) {
      this.isDisabledPrev10 = false;
    }
  }

  previousStaffs(): void {
    if (this.initGap - 10 >= 0) {
      this.initGap -= 10;
      this.gap -= 10;
      this.listOfSchedule.pipe(map(value => value.slice(this.initGap, this.gap))).subscribe((resp) => {
        this.filteredScheduleList = resp;
      }).unsubscribe();
    } else {
      this.isDisabledPrev10 = true;
    }
  }

  getTimes(): void {
    const start = moment('09:00:00', 'HH:mm:ss');
    const end = moment('21:59:59', 'HH:mm:ss');
    while (start.isSameOrBefore(end)) {
      this.listOfTimes.push(start.add(15, 'm').format('HH:mm'));
    }
  }

  async getAppointments(): Promise<void> {
    this.spinnerService.show(this.spinner);
  async getAppointments(showSpinner?: boolean): Promise<any> {
    setTimeout(() => {
      this.spinnerService.show(this.spinner);

    }, 100);
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.eq('date', new Date(this.currentDate.format('YYYY-MM-DD')).valueOf());
    const data = await this.staffService.getStaffsAppointments(queryBuilder.buildUrlEncoded()).toPromise();
    this.listOfSchedule = new Observable<StaffDto[]>(subscriber => {
      subscriber.next(data);
      subscriber.complete();
      subscriber.unsubscribe();
    });
    this.responseSize = data.length;
    this.spinnerService.hide(this.spinner);
    this.spinnerService.hide(this.spinner);
    if (showSpinner) {
      this.initFilteredList();
    }
  }

  openAddAppointmentDialog(data?: any): void {
    DialogUtil.openDialog(AddAppointmentDialogComponent, {
      position: {right: '0'},
      height: '100vh',
      width: '40%',
      maxWidth: '50%',
      data
    }, this.dialog).afterClosed().subscribe(async () => {
      await this.getAppointments();
    });
  }

  openAppointmentOverviewDialog(appointment: Appointment): void {
    DialogUtil.openDialog(AppointmentOverviewDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: appointment
    }, this.dialog).afterClosed().subscribe(async () => {
      await this.getAppointments();
    });
  }

  async nextDay(): Promise<void> {
    this.currentDate = this.currentDate.add(1, 'd');
    await this.getAppointments();
  }

  async previousDay(): Promise<void> {
    this.currentDate = this.currentDate.subtract(1, 'd');
    await this.getAppointments();
  }
}
