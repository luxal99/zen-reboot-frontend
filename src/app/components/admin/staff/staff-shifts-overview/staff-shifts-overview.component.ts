import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {StaffService} from '../../../../service/staff.service';
import {CriteriaBuilder} from '../../../../util/criteria-builder';
import {StaffDto} from 'src/app/models/staff-dto';
import {DialogUtil} from '../../../../util/dialog-util';
import {AddShiftDialogComponent} from './add-shift-dialog/add-shift-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Shift} from '../../../../models/shift';
import {SpinnerService} from '../../../../service/spinner.service';
import {MatSpinner} from '@angular/material/progress-spinner';
import {Person} from '../../../../models/person';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DialogOptions} from '../../../../util/dialog-options';

@Component({
  selector: 'app-staff-shifts-overview',
  templateUrl: './staff-shifts-overview.component.html',
  styleUrls: ['./staff-shifts-overview.component.sass']
})
export class StaffShiftsOverviewComponent implements OnInit, AfterViewChecked {

  @ViewChild('spinner') spinner!: MatSpinner;
  @ViewChild('scheduledBinding') scheduledBinding!: ElementRef;

  listOfScheduled: StaffDto[] = [];
  startDate: moment.Moment = moment().startOf('isoWeek');
  endDate: moment.Moment = moment().endOf('isoWeek');
  daysInWeek: any [] = [];

  shiftPerStaff: Shift = {};
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  searchText = '';

  initGap = 0;
  gap = 10;
  responseArray!: Observable<StaffDto[]>;
  responseSize = 0;
  urlEncoded = '';

  constructor(public staffService: StaffService, private dialog: MatDialog,
              private spinnerService: SpinnerService, private readonly changeDetectorRef: ChangeDetectorRef) {
  }


  ngOnInit(): void {
    this.getWeek(this.startDate, this.endDate);
    setTimeout(() => {
      this.filterShift();
    }, 100);
  }

  getUrlEncoded(): void {
    const queryBuilder = new CriteriaBuilder();
    // @ts-ignore
    queryBuilder.gt('date', new Date(this.startDate).valueOf()).and()
      // @ts-ignore
      .lt('date', new Date(this.endDate).valueOf());
    this.urlEncoded = queryBuilder.buildUrlEncoded();
  }

  ngAfterViewChecked(): void {
    this.setResponsive();
    this.changeDetectorRef.detectChanges();
  }

  setResponsive(): void {
    // @ts-ignore
    const div = document.querySelector('#scheduledBinding');
    if (window.screen.width <= 570) {
      // @ts-ignore
      for (const child of div.children) {
        // @ts-ignore
        child.classList.remove('row');
        child.classList.add('inline');
      }

    }
  }

  getWeek(startDate: any, endDate: any): void {
    this.daysInWeek = [];
    let day = startDate;
    while (day < endDate) {
      this.daysInWeek.push(day);
      day = day.clone().add(1, 'd');
    }
  }

  nextWeek(): void {
    let i = 0;
    this.getWeek(this.startDate.add(++i, 'w'), this.endDate.add(i++, 'w'));
    this.filterShift();
  }

  previousWeek(): void {
    let i = 0;
    this.getWeek(this.startDate.subtract(++i, 'w'), this.endDate.subtract(i++, 'w'));
    this.filterShift();
  }

  nextStaffPage(): void {
    if (this.initGap + 10 < this.responseSize) {
      this.initGap += 10;
      this.gap += 10;
      this.filterShift();
    }
  }

  previousStaffPage(): void {
    if (!(this.initGap - 10 < 0)) {
      this.initGap -= 10;
      this.gap -= 10;
      this.filterShift();
    }
  }

  filterShift(): void {
    this.spinnerService.show(this.spinner);
    this.getUrlEncoded();
    // @ts-ignore
    this.staffService.getStaffsShifts(this.urlEncoded)
      .pipe(map(value => {
        if (!this.responseArray) {
          this.responseSize = value.length;
          this.responseArray = new Observable<StaffDto[]>(subscriber => {
            subscriber.next(value);
            subscriber.complete();
            subscriber.unsubscribe();
          });
        }
        return value.slice(this.initGap, this.gap);
      }))
      .subscribe((resp) => {
        this.listOfScheduled = resp;
        this.spinnerService.hide(this.spinner);
      });
  }

  openAddShiftDialog(staff: any, date: any, shf?: Shift): void {
    DialogUtil.openDialog(AddShiftDialogComponent, DialogOptions.setDialogConfig(
      {
        position: {top: '6%'},
        data: shf ? shf : {staff, date},
        width: '30%',
      }
    ), this.dialog).afterClosed().subscribe(() => {
      this.filterShift();
    });
  }

  getShiftByDate(date: moment.Moment, person: Person): Shift {
    const staff = this.listOfScheduled.find((item) => item.person?.id === person.id);
    // @ts-ignore
    this.shiftPerStaff = staff.shifts?.find((shift) => shift.date === date.format('YYYY-MM-DD'));
    return this.shiftPerStaff;
  }

  search(): void {
    this.responseArray.subscribe((resp) => {
      this.listOfScheduled = resp.filter((staff) =>
        staff.person?.firstName?.toLowerCase().startsWith(this.searchText.toLowerCase())
        || staff.person?.lastName?.startsWith(this.searchText.toLowerCase())).slice(0, 10);
    });
  }
}
