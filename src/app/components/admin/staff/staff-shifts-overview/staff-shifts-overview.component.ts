import {Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-staff-shifts-overview',
  templateUrl: './staff-shifts-overview.component.html',
  styleUrls: ['./staff-shifts-overview.component.sass']
})
export class StaffShiftsOverviewComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfScheduled: StaffDto[] = [];
  startDate: moment.Moment = moment().startOf('isoWeek');
  endDate: moment.Moment = moment().endOf('isoWeek');
  daysInWeek: any [] = [];

  constructor(private staffService: StaffService, private dialog: MatDialog, private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.getWeek(this.startDate, this.endDate);

    setTimeout(() => {
      this.filterShift(this.startDate, this.endDate);
    }, 100);
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
  }

  filterShift(startDate: any, endDate: any): void {
    this.spinnerService.show(this.spinner);
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.gt('date', moment(startDate).format('X')).and()
      .lt('date', moment(endDate).format('X'));

    this.staffService.getStaffsShifts(queryBuilder.buildUrlEncoded()).subscribe((resp) => {
      this.listOfScheduled = resp;
      this.spinnerService.hide(this.spinner);
    });
  }

  openAddShiftDialog(staff: any, date: any): void {
    const shift: Shift = {
      staff,
      date
    };
    DialogUtil.openDialog(AddShiftDialogComponent, {
      position: {top: '6%'},
      data: shift,
      width: '30%',
    }, this.dialog);
  }
}
