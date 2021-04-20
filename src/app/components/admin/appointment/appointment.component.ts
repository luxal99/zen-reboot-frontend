import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
import {AppointmentService} from '../../../service/appointment.service';
import {AppointmentOverviewDialogComponent} from './appointment-overview-dialog/appointment-overview-dialog.component';
import {TreatmentService} from '../../../service/treatment.service';
import {Observable} from 'rxjs';

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
  isDisabledPrev10 = false;
  delay = 100;

  constructor(private dialog: MatDialog, private staffService: StaffService, protected snackBar: MatSnackBar,
              private appointmentService: AppointmentService, private treatmentService: TreatmentService,) {
    super(staffService, snackBar);
  }

  getDelay(): number {
    this.delay += 100;
    console.log(this.delay);
    return this.delay;
  }

  ngOnInit(): void {
    this.getAppointments(false).then(() => {
      this.initFilteredList();
    });
    this.getTimes();
  }

  nextStaffs(): void {
    this.listOfSchedule.subscribe((resp) => {
      if (this.initGap + 10 < resp.length) {
        this.initGap += 10;
        this.gap += 10;
        this.isDisabledPrev10 = false;
      } else {
        this.isDisabledNext10 = true;
      }
    });

    this.listOfSchedule.subscribe((resp) => {
      this.filteredScheduleList = resp.slice(this.initGap, this.gap);
    });
  }

  initFilteredList(): void {
    this.listOfSchedule.subscribe((resp) => {
      this.filteredScheduleList = resp.slice(this.initGap, this.gap);
      this.spinnerService.hide(this.spinner);
    }).unsubscribe();
  }

  previousStaffs(): void {
    if (this.initGap - 10 >= 0) {
      this.initGap -= 10;
      this.isDisabledNext10 = false;
    } else {
      this.isDisabledPrev10 = true;
    }
    if (this.gap - 10 >= 10) {
      this.gap -= 10;
    }
    this.listOfSchedule.subscribe((resp) => {
      this.filteredScheduleList = resp.slice(this.initGap, this.gap);
    }).unsubscribe();
  }

  getTimes(): void {
    const start = moment('09:00:00', 'HH:mm:ss');
    const end = moment('21:59:59', 'HH:mm:ss');
    while (start.isSameOrBefore(end)) {
      this.listOfTimes.push(start.add(15, 'm').format('HH:mm'));
    }
  }

  async getAppointments(showSpinner?: boolean): Promise<any> {
    if (showSpinner) {
      this.spinnerService.show(this.spinner);
    }
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.eq('date', new Date(this.currentDate.format('YYYY-MM-DD')).valueOf());
    const data = await this.staffService.getStaffsAppointments(queryBuilder.buildUrlEncoded()).toPromise();
    this.listOfSchedule = new Observable<StaffDto[]>(subscriber => {
      subscriber.next(data);
      subscriber.complete();
      subscriber.unsubscribe();
    });
    if (showSpinner) {
      this.initFilteredList();
      this.spinnerService.hide(this.spinner);
    }
  }

  openAddAppointmentDialog(data?: any): void {
    DialogUtil.openDialog(AddAppointmentDialogComponent, {
      position: {right: '0'},
      height: '100vh',
      width: '40%',
      maxWidth: '50%',
      data
    }, this.dialog).afterClosed().subscribe(() => {
      this.getAppointments(true);
    });
  }

  openAppointmentOverviewDialog(appointment: Appointment): void {
    DialogUtil.openDialog(AppointmentOverviewDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: appointment
    }, this.dialog).afterClosed().subscribe(() => {
      this.getAppointments();
    });
  }

  nextDay(): void {
    this.currentDate = this.currentDate.add(1, 'd');
    this.getAppointments(true);
  }

  previousDay(): void {
    this.currentDate = this.currentDate.subtract(1, 'd');
    this.getAppointments(true);
  }

  getFilteredList($event: any): void {
    console.log($event);
    this.filteredScheduleList = $event;
  }
}
