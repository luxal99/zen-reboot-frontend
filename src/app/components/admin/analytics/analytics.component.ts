import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from 'src/app/models/appointment';
import {Package} from 'src/app/models/package';
import {AnalyticsService} from 'src/app/service/analytics.service';
import {FormControl, FormControlName, FormGroup} from '@angular/forms';
import {FormControlNames, InputTypes} from '../../../const/const';
import {FieldConfig} from '../../../models/FIeldConfig';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.sass']
})
export class AnalyticsComponent implements OnInit {

  expiredPackagesColumns = [];
  canceledAppointmentsColumns = ['date', 'treatment', 'client', 'total'];
  listOfPeriods: string[] = [];
  listOfExpiredPackages: Package[] = [];

  listOfCanceledAppointments: Appointment[] = [];
  filterExpiredPackagesForm = new FormGroup({
    search: new FormControl('TODAY')
  });

  filterCanceledAppointmentsForm = new FormGroup({
    search: new FormControl('TODAY')
  });
  appointmentFilterPeriodSelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.SEARCH_FORM_CONTROL};
  packageFilterPeriodSelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.SEARCH_FORM_CONTROL};

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.getPeriods();
    this.filterExpiredPackages();
    this.filterCanceledAppointments();
  }

  filterExpiredPackages(): void {
    this.analyticsService.getExpiredPackages(this.filterExpiredPackagesForm.get(FormControlNames.SEARCH_FORM_CONTROL)?.value)
      .subscribe((resp) => {
        this.listOfExpiredPackages = resp;
      });
  }

  filterCanceledAppointments(): void {
    this.analyticsService.getCanceledAppointments(this.filterCanceledAppointmentsForm.get(FormControlNames.SEARCH_FORM_CONTROL)?.value)
      .subscribe((resp) => {
        this.listOfCanceledAppointments = resp;
      });
  }

  getPeriods(): void {
    this.analyticsService.getAnalyticPeriods().subscribe((resp) => {
      this.listOfPeriods = resp;
    });
  }
}
