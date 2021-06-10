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
  listOfExpiredPackages: Package[] = [];
  voucherAnalyticsDto!: InvoiceItemAnalyticsDto;
  packageAnalyticsDto!: InvoiceItemAnalyticsDto;
  appointmentsAnalyticsDto!: InvoiceItemAnalyticsDto;

  listOfCanceledAppointments: Appointment[] = [];
  listOfCompletedAppointments: Appointment[] = [];

  constructor(private analyticsService: AnalyticsService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCanceledAppointments();
    this.getCompletedAppointments();
    this.getAppointmentsAnalytics();
  }

  onTabChange(): void {
    if (this.voucherAndPackageAnalyticsTab.isActive) {
      this.getVoucherAnalytics();
      this.getPackageAnalytics();
      this.getExpiredPackages();
    } else if (this.staffAndClientsAnalyticsTab.isActive) {

    }
  }

  getExpiredPackages(event?: string): void {
    this.analyticsService.getExpiredPackages(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.listOfExpiredPackages = resp;
      });
  }

  getCanceledAppointments(event?: string): void {
    this.analyticsService.getCanceledAppointments(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.listOfCanceledAppointments = resp;
      });
  }

  getVoucherAnalytics(event?: string): void {
    this.analyticsService.getVouchersAnalytics(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.voucherAnalyticsDto = resp;
      });
  }

  getAppointmentsAnalytics(event?: string): void {
    this.analyticsService.getAppointmentsAnalytics(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.appointmentsAnalyticsDto = resp;
      });
  }

  getCompletedAppointments(event?: string): void {
    this.analyticsService.getCompletedAppointments(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.listOfCompletedAppointments = resp;
      });
  }

  getPackageAnalytics(event?: string): void {
    this.analyticsService.getPackagesAnalytics(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.packageAnalyticsDto = resp;
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
