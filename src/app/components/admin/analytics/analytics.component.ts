import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Appointment} from 'src/app/models/appointment';
import {Package} from 'src/app/models/package';
import {AnalyticsService} from 'src/app/service/analytics.service';
import {FormControl, FormControlName, FormGroup} from '@angular/forms';
import {FormControlNames, InputTypes} from '../../../const/const';
import {FieldConfig} from '../../../models/FIeldConfig';
import {Column} from '../../../models/column';
import {DialogUtil} from '../../../util/dialog-util';
import {AppointmentOverviewDialogComponent} from '../appointment/appointment-overview-dialog/appointment-overview-dialog.component';
import {MatDatepicker} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material/dialog';
import {setDialogConfig} from '../../../util/dialog-options';
import {InvoiceItemAnalyticsDto} from '../../../models/voucher-package-analytics-dto';
import {MatTab} from '@angular/material/tabs';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.sass']
})
export class AnalyticsComponent implements OnInit {

  @ViewChild('appointmentsAnalyticsTab') appointmentsAnalyticsTab!: MatTab;
  @ViewChild('voucherAndPackageAnalyticsTab') voucherAndPackageAnalyticsTab!: MatTab;
  @ViewChild('staffAndClientsAnalyticsTab') staffAndClientsAnalyticsTab!: MatTab;
  expiredPackagesColumns = [];
  voucherColumns: Column[] =
    [
      {name: 'count', displayedName: 'Broj', value: 'count'},
      {name: 'start', displayedName: 'Početak', value: 'start'},
      {name: 'end', displayedName: 'Kraj', value: 'end'},
      {name: 'type', displayedName: 'Tip', value: 'type'},
      {name: 'value', displayedName: 'Vrednost', value: 'value'},

    ];
  canceledAppointmentsColumns: Column[] =
    [
      {name: 'date', displayedName: 'Datum', value: 'date'},
      {name: 'firstName', displayedName: 'Ime', value: 'staff.person.firstName'},
      {name: 'lastName', displayedName: 'Prezime', value: 'staff.person.lastName'},
      {name: 'treatment', displayedName: 'Tretman', value: 'treatment.name'},
      {name: 'total', displayedName: 'Total', value: 'treatment.price'},
    ];
  listOfPeriods: string[] = [];
  listOfExpiredPackages: Package[] = [];
  voucherAnalyticsDto!: InvoiceItemAnalyticsDto;
  packageAnalyticsDto!: InvoiceItemAnalyticsDto;

  listOfCanceledAppointments: Appointment[] = [];
  listOfCompletedAppointments: Appointment[] = [];

  filterExpiredPackagesForm = new FormGroup({
    search: new FormControl('TODAY')
  });
  filterCanceledAppointmentsForm = new FormGroup({
    search: new FormControl('TODAY')
  });
  appointmentFilterPeriodSelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.SEARCH_FORM_CONTROL};
  packageFilterPeriodSelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.SEARCH_FORM_CONTROL};

  constructor(private analyticsService: AnalyticsService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getPeriods();
    this.getCanceledAppointments();
    this.getCompletedAppointments();
  }

  onTabChange(): void {
    if (this.voucherAndPackageAnalyticsTab.isActive) {
      this.getVoucherAnalytics();
      this.getPackageAnalytics();
      this.getExpiredPackages();
    } else if (this.staffAndClientsAnalyticsTab.isActive) {

    }
  }

  getExpiredPackages(): void {
    this.analyticsService.getExpiredPackages(this.filterExpiredPackagesForm.get(FormControlNames.SEARCH_FORM_CONTROL)?.value)
      .subscribe((resp) => {
        this.listOfExpiredPackages = resp;
      });
  }

  getCanceledAppointments(): void {
    this.analyticsService.getCanceledAppointments(this.filterCanceledAppointmentsForm.get(FormControlNames.SEARCH_FORM_CONTROL)?.value)
      .subscribe((resp) => {
        this.listOfCanceledAppointments = resp;
      });
  }

  getVoucherAnalytics(): void {
    this.analyticsService.getVouchersAnalytics(this.filterCanceledAppointmentsForm.get(FormControlNames.SEARCH_FORM_CONTROL)?.value)
      .subscribe((resp) => {
        this.voucherAnalyticsDto = resp;
      });
  }

  getCompletedAppointments(): void {
    this.analyticsService.getCompletedAppointments(this.filterCanceledAppointmentsForm.get(FormControlNames.SEARCH_FORM_CONTROL)?.value)
      .subscribe((resp) => {
        this.listOfCompletedAppointments = resp;
      });
  }

  getPackageAnalytics(): void {
    this.analyticsService.getPackagesAnalytics(this.filterCanceledAppointmentsForm.get(FormControlNames.SEARCH_FORM_CONTROL)?.value)
      .subscribe((resp) => {
        this.packageAnalyticsDto = resp;
      });
  }

  getPeriods(): void {
    this.analyticsService.getAnalyticPeriods().subscribe((resp) => {
      this.listOfPeriods = resp;
    });
  }

  openAppointmentOverviewDialog(data: any): void {
    DialogUtil.openDialog(AppointmentOverviewDialogComponent, setDialogConfig({
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data
    }), this.dialog);
  }
}
