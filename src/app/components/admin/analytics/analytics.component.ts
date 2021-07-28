import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Appointment} from 'src/app/models/entity/appointment';
import {AnalyticsService} from 'src/app/service/analytics.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Column} from '../../../models/util/column';
import {DialogUtil} from '../../../util/dialog-util';
import {AppointmentOverviewDialogComponent} from '../appointment/appointment-overview-dialog/appointment-overview-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {setDialogConfig} from '../../../util/dialog-options';
import {InvoiceItemAnalyticsDto} from '../../../models/dto/voucher-package-analytics-dto';
import {MatTab} from '@angular/material/tabs';
import {FieldConfig} from '../../../models/util/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../const/const';
import {PeriodsService} from '../../../service/periods.service';
import {ComponentType} from '@angular/cdk/portal';
import {LazyLoadComponentsUtil} from '../../../util/lazy-loading-components';
import {VouchersAndPackagesAnalyticsOverviewComponent} from './vouchers-and-packages-analytics-overview/vouchers-and-packages-analytics-overview.component';
import {ClientsAndStaffsAnalyticsOverviewComponent} from './clients-and-staffs-analytics-overview/clients-and-staffs-analytics-overview.component';
import {APPOINTMENT_ANALYTICS_COLUMNS} from '../../../const/table-column-values';
import {ProfitAndExpensesAnalyticsOverviewComponent} from './profit-and-expenses-analytics-overview/profit-and-expenses-analytics-overview.component';
import {MatSpinner} from '@angular/material/progress-spinner';
import {SpinnerService} from '../../../service/spinner.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.sass']
})
export class AnalyticsComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  @ViewChild('staffAndClientsAnalyticsTab') staffAndClientsAnalyticsTab!: MatTab;
  @ViewChild('staffAndClientsAnalyticsContent', {
    read: ViewContainerRef,
    static: false
  }) staffAndClientsAnalyticsContent!: ViewContainerRef;

  @ViewChild('voucherAndPackageAnalyticsTab') voucherAndPackageAnalyticsTab!: MatTab;
  @ViewChild('voucherAndPackageAnalyticsContent', {
    read: ViewContainerRef,
    static: false
  }) voucherAndPackageAnalyticsContent!: ViewContainerRef;

  @ViewChild('profitAndExpensesTab') profitAndExpensesTab!: MatTab;
  @ViewChild('profitAndExpensesContent', {
    read: ViewContainerRef,
    static: false
  }) profitAndExpensesContent!: ViewContainerRef;

  filterForm = new FormGroup({
    period: new FormControl('TODAY')
  });

  appointmentAnalyticsColumns: Column[] = APPOINTMENT_ANALYTICS_COLUMNS;
  appointmentsAnalyticsDto!: InvoiceItemAnalyticsDto;
  listOfCanceledAppointments: Appointment[] = [];
  listOfCompletedAppointments: Appointment[] = [];

  periodSelectConfig: FieldConfig = {
    name: FormControlNames.PERIOD_FORM_CONTROL,
    type: InputTypes.SELECT_TYPE_NAME, label: 'Izbor perioda', options: this.periodService.listOfPeriods
  };

  constructor(private analyticsService: AnalyticsService, private dialog: MatDialog,
              private spinnerService: SpinnerService,
              private periodService: PeriodsService, private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.getCanceledAppointments();
    this.getCompletedAppointments();
    this.getAppointmentsAnalytics();
  }

  onTabChange(): void {
    if (this.voucherAndPackageAnalyticsTab.isActive) {
      this.loadComponent(VouchersAndPackagesAnalyticsOverviewComponent, this.voucherAndPackageAnalyticsContent);
      this.staffAndClientsAnalyticsContent.clear();
      this.profitAndExpensesContent.clear()
    } else if (this.staffAndClientsAnalyticsTab.isActive) {
      this.loadComponent(ClientsAndStaffsAnalyticsOverviewComponent, this.staffAndClientsAnalyticsContent);
      this.voucherAndPackageAnalyticsContent.clear();
    } else if (this.profitAndExpensesTab.isActive) {
      this.voucherAndPackageAnalyticsContent.clear();
      this.staffAndClientsAnalyticsContent.clear();
      this.loadComponent(ProfitAndExpensesAnalyticsOverviewComponent, this.profitAndExpensesContent);

    }
  }

  getCanceledAppointments(event?: string): void {
    this.analyticsService.getCanceledAppointments(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.listOfCanceledAppointments = resp;
      });
  }

  getAppointmentsAnalytics(event?: any): void {
    this.analyticsService.getAppointmentsAnalytics(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.appointmentsAnalyticsDto = resp;
        setTimeout(() => {
          this.spinnerService.hide(this.spinner);
        });
      });
  }

  getCompletedAppointments(event?: string): void {
    this.analyticsService.getCompletedAppointments(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.listOfCompletedAppointments = resp;
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

  loadComponent(component: ComponentType<any>, entry: ViewContainerRef): void {
    setTimeout(() => {
      LazyLoadComponentsUtil.loadComponent(component, entry, this.resolver);
    }, 200);
  }
}
