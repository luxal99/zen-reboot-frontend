import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {StaffService} from '../../../../service/staff.service';
import {CriteriaBuilder} from '../../../../util/criteria-builder';
import {StaffDto} from 'src/app/models/staff-dto';
import {Staff} from '../../../../models/staff';
import {DialogUtil} from '../../../../util/dialog-util';
import {AddShiftDialogComponent} from './add-shift-dialog/add-shift-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Shift} from '../../../../models/shift';
import {SpinnerService} from '../../../../service/spinner.service';
import {MatSpinner} from '@angular/material/progress-spinner';
import {Person} from '../../../../models/person';
import {FormControl, FormGroup} from '@angular/forms';
import {element} from 'protractor';

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

  constructor(private staffService: StaffService, private dialog: MatDialog,
              private spinnerService: SpinnerService, private readonly changeDetectorRef: ChangeDetectorRef) {
  }


  ngOnInit(): void {
    this.getWeek(this.startDate, this.endDate);

    setTimeout(() => {
      this.filterShift(this.startDate, this.endDate);
    }, 100);
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
    this.filterShift(this.startDate, this.endDate);
  }

  previousWeek(): void {
    let i = 0;
    this.getWeek(this.startDate.subtract(++i, 'w'), this.endDate.subtract(i++, 'w'));
    this.filterShift(this.startDate, this.endDate);
  }

  filterShift(startDate: any, endDate: any): void {
    this.spinnerService.show(this.spinner);
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.gt('date', new Date(startDate).valueOf()).and()
      .lt('date', new Date(endDate).valueOf());

    this.staffService.getStaffsShifts(queryBuilder.buildUrlEncoded()).subscribe((resp) => {
      this.listOfScheduled = resp;
      this.spinnerService.hide(this.spinner);
    });
  }

  openAddShiftDialog(staff: any, date: any, shf?: Shift): void {
    DialogUtil.openDialog(AddShiftDialogComponent, {
      position: {top: '6%'},
      data: shf ? shf : {staff, date},
      width: '30%',
    }, this.dialog).afterClosed().subscribe(() => {
      this.filterShift(this.startDate, this.endDate);
    });
  }

  getShiftByDate(date: moment.Moment, person: Person): Shift {
    const staff = this.listOfScheduled.find((item) => item.person?.id === person.id);
    // @ts-ignore
    this.shiftPerStaff = staff.shifts?.find((shift) => shift.date === date.format('YYYY-MM-DD'));
    return this.shiftPerStaff;
  }
}
