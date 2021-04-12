import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-staff-shifts-overview',
  templateUrl: './staff-shifts-overview.component.html',
  styleUrls: ['./staff-shifts-overview.component.sass']
})
export class StaffShiftsOverviewComponent implements OnInit {

  startDate: moment.Moment = moment().startOf('isoWeek');
  endDate: moment.Moment = moment().endOf('isoWeek');
  daysInWeek: any [] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.getWeek(this.startDate, this.endDate);
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
  }

  previousWeek(): void {
    let i = 0;
    this.getWeek(this.startDate.subtract(++i, 'w'), this.endDate.subtract(i++, 'w'));
  }
}
