import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {StaffService} from '../../../../service/staff.service';
import {CriteriaBuilder} from '../../../../util/criteria-builder';
import {StaffDto} from 'src/app/models/staff-dto';

@Component({
  selector: 'app-staff-shifts-overview',
  templateUrl: './staff-shifts-overview.component.html',
  styleUrls: ['./staff-shifts-overview.component.sass']
})
export class StaffShiftsOverviewComponent implements OnInit {

  listOfScheduled: StaffDto[] = [];
  startDate: moment.Moment = moment().startOf('isoWeek');
  endDate: moment.Moment = moment().endOf('isoWeek');
  daysInWeek: any [] = [];

  constructor(private staffService: StaffService) {
  }

  ngOnInit(): void {
    this.getWeek(this.startDate, this.endDate);
    this.filterShift(this.startDate, this.endDate);
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
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.gt('date', moment(startDate).format('X')).and()
      .lt('date', moment(endDate).format('X'));

    this.staffService.getStaffsShifts(queryBuilder.buildUrlEncoded()).subscribe((resp) => {
      this.listOfScheduled = resp;
    });
  }
}
