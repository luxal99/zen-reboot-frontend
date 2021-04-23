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
import {filter, map} from 'rxjs/operators';
import {LocationService} from '../../../service/location.service';
import {Location} from '../../../models/location';

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
  defaultLocation: Location = {};
  initGap = 0;
  gap = 10;

  isDisabledNext10 = false;
  isDisabledPrev10 = true;

  responseSize = 0;

  listOfLocations: Location[] = [];

  constructor(private dialog: MatDialog, private staffService: StaffService,
              protected snackBar: MatSnackBar, public locationService: LocationService) {
    super(staffService, snackBar);
  }

  ngOnInit(): void {
    this.getTimes();
    this.getLocations();
    setTimeout(async () => {
      this.getAppointments();
    }, 100);
  }

  getLocations(): void {
    this.locationService.getAll().subscribe((resp) => {
      this.listOfLocations = resp;
      this.defaultLocation = resp[0];
    });
  }

  changeLocation(forwardedElement: any, location: Location): void {
    const element = document.querySelectorAll('.location-active');
    [].forEach.call(element, (el: any) => {
      el.classList.remove('location-active');
      el.classList.add('location-inactive');
    });
    forwardedElement.target.className = 'location-active';
    this.defaultLocation = location;
    this.getAppointments();
  }


  nextStaffs(): void {
    this.initGap += 10;
    this.gap += 10;
    this.getAppointments();
  }

  previousStaffs(): void {
    if (this.initGap - 10 >= 0) {
      this.initGap -= 10;
      this.gap -= 10;
      this.getAppointments();
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

  getAppointments(): void {
    this.spinnerService.show(this.spinner);
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.eq('date', new Date(this.currentDate.format('YYYY-MM-DD')).valueOf());
    this.staffService.getStaffsAppointments(queryBuilder.buildUrlEncoded())
      .pipe(map(value => value.slice(this.initGap, this.gap)))
      .pipe(map(value => value.filter((staffDto) =>
        staffDto.appointments = staffDto.appointments?.filter((appointment) => appointment.location.id === this.defaultLocation.id))))
      .subscribe((resp) => {
        this.filteredScheduleList = resp;
        this.spinnerService.hide(this.spinner);
      });
  }

  openAddAppointmentDialog(data?: any): void {
    DialogUtil.openDialog(AddAppointmentDialogComponent, {
      position: {right: '0'},
      height: '100vh',
      width: '70%',
      maxWidth: '70%',
      data
    }, this.dialog).afterClosed().subscribe(async () => {
      this.getAppointments();
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
      this.getAppointments();
    });
  }

  nextDay(): void {
    this.currentDate = this.currentDate.add(1, 'd');
    this.getAppointments();
  }

  previousDay(): void {
    this.currentDate = this.currentDate.subtract(1, 'd');
    this.getAppointments();
  }

  search(): void {
    this.listOfSchedule.pipe(map(value => value.filter((staff) =>
      staff.person?.firstName?.toLowerCase().startsWith(this.searchText.toLowerCase())
      || staff.person?.lastName?.startsWith(this.searchText.toLowerCase())).slice(0, 10)))
      .subscribe((resp) => {
        this.filteredScheduleList = resp;
      });
  }
}
