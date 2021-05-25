import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {AddAppointmentDialogComponent} from './add-appointment-dialog/add-appointment-dialog.component';
import {CriteriaBuilder} from '../../../util/criteria-builder';
import * as moment from 'moment';
import {Appointment} from '../../../models/appointment';
import {DefaultComponent} from '../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup} from '@angular/forms';
import {AppointmentOverviewDialogComponent} from './appointment-overview-dialog/appointment-overview-dialog.component';
import {map} from 'rxjs/operators';
import {LocationService} from '../../../service/location.service';
import {Location} from '../../../models/location';
import {RoomDto} from '../../../models/room-dto';
import {setDialogConfig} from '../../../util/dialog-options';
import {RoomService} from '../../../service/room.service';
import {AppointmentService} from '../../../service/appointment.service';
import {AppointmentStatusService} from '../../../service/appointment-status.service';
import {AppointmentStatus} from '../../../models/appointment-status';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.sass']
})
export class AppointmentComponent extends DefaultComponent<Appointment> implements OnInit {

  filteredScheduleList: RoomDto[] = [];
  listOfTimes: string[] = [];

  currentDate = moment();

  searchForm = new FormGroup({
    search: new FormControl()
  });

  searchText = '';
  defaultLocation: Location = {};

  allRooms = false;
  initGap = 0;
  gap = 7;


  isDisabledNext10 = false;
  isDisabledPrev10 = true;

  responseSize = 0;

  listOfLocations: Location[] = [];

  constructor(private dialog: MatDialog, protected snackBar: MatSnackBar, public locationService: LocationService,
              private roomService: RoomService, private appointmentService: AppointmentService,
              private appointmentStatusService: AppointmentStatusService) {
    super(appointmentService, snackBar);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.setResponsive();
    }, 100);
    this.getTimes();
    this.getLocations().then(() => {
      this.getAppointments();
    });
  }

  async getLocations(): Promise<void> {
    this.listOfLocations = await this.locationService.getAll().toPromise();
    this.defaultLocation = this.listOfLocations[0];
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
    this.initGap += 7;
    this.gap += 7;
    this.allRooms ? this.getAppointments() : this.getAllRoomsAppointments();
  }

  previousStaffs(): void {
    if (this.initGap - 7 >= 0) {
      this.initGap -= 7;
      this.gap -= 7;
      this.allRooms ? this.getAppointments() : this.getAllRoomsAppointments();
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
    this.locationService.getAppointmentPerRoom(this.defaultLocation.id, queryBuilder.buildUrlEncoded())
      .pipe(map(value => value.slice(this.initGap, this.gap)))
      .subscribe((resp) => {
        this.filteredScheduleList = resp;
        this.spinnerService.hide(this.spinner);
      });
  }

  openAddAppointmentDialog(data?: any): void {
    DialogUtil.openDialog(AddAppointmentDialogComponent,
      setDialogConfig({
        position: {right: '0'},
        height: '100vh',
        width: '70%',
        maxWidth: '70%',
        data
      }), this.dialog).afterClosed().subscribe(async () => {
      this.allRooms ? this.getAllRoomsAppointments() : this.getAppointments();
    });
  }

  openAppointmentOverviewDialog(appointment: Appointment): void {
    DialogUtil.openDialog(AppointmentOverviewDialogComponent,
      setDialogConfig({
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        data: appointment
      }), this.dialog).afterClosed().subscribe(async () => {
      this.allRooms ? this.getAllRoomsAppointments() : this.getAppointments();
    });
  }

  nextDay(): void {
    this.currentDate = this.currentDate.add(1, 'd');
    this.allRooms ? this.getAllRoomsAppointments() : this.getAppointments();
  }

  previousDay(): void {
    this.currentDate = this.currentDate.subtract(1, 'd');
    this.allRooms ? this.getAllRoomsAppointments() : this.getAppointments();
  }

  setResponsive(): void {
    // @ts-ignore
    const div = document.querySelector('#calendarBinding');
    if (window.screen.width <= 570) {
      // @ts-ignore
      for (const child of div.children) {
        // @ts-ignore
        child.classList.remove('row');
        child.classList.add('inline');
      }

    }
  }

  getAllRoomsAppointments(forwardedElement?: any): void {
    this.spinnerService.show(this.spinner);
    const element = document.querySelectorAll('.location-active');
    [].forEach.call(element, (el: any) => {
      el.classList.remove('location-active');
      el.classList.add('location-inactive');
    });
    if (forwardedElement) {
      forwardedElement.target.className = 'location-active';
    }
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.eq('date', new Date(this.currentDate.format('YYYY-MM-DD')).valueOf());
    this.roomService.getAppointmentsForAllRooms(queryBuilder.buildUrlEncoded())
      .pipe(map(value => value.slice(this.initGap, this.gap)))
      .subscribe((resp) => {
        this.filteredScheduleList = resp;
        this.spinnerService.hide(this.spinner);
      });
  }

  async checkAppointment(appointment: Appointment): Promise<void> {
    super.otherSubscribe(this.appointmentService.setConfirmStatus(appointment.id));
  }

  search(): void {
  }
}
