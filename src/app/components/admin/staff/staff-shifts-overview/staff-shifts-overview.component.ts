import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-staff-shifts-overview',
  templateUrl: './staff-shifts-overview.component.html',
  styleUrls: ['./staff-shifts-overview.component.sass']
})
export class StaffShiftsOverviewComponent implements OnInit {

  startDate!: moment.Moment;
  endDate!: moment.Moment;

  constructor() {
  }

  ngOnInit(): void {
    this.getWeek();
  }

  getWeek(): void {
    this.startDate = moment().startOf('isoWeek');
    this.endDate = moment().endOf('isoWeek');

  }

}
