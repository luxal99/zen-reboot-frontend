import {Component, OnInit} from '@angular/core';
import {Column} from '../../../../models/column';
import {AnalyticsService} from '../../../../service/analytics.service';
import {InvoiceItemAnalyticsDto} from '../../../../models/voucher-package-analytics-dto';
import {Package} from '../../../../models/package';
import {
  EXPIRED_PACKAGES_COLUMNS,
  EXPIRED_VOUCHERS_COLUMNS,
  INVOICE_ITEMS_COLUMNS
} from '../../../../const/table-column-values';
import {Voucher} from '../../../../models/voucher';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../../util/dialog-util';
import {ClientOverviewDialogComponent} from '../../client/client-overview-dialog/client-overview-dialog.component';
import {setDialogConfig} from '../../../../util/dialog-options';
import {VoucherOverviewDialogComponent} from '../../vouchers/voucher-overview-dialog/voucher-overview-dialog.component';


@Component({
  selector: 'app-vouchers-and-packages-analytics-overview',
  templateUrl: './vouchers-and-packages-analytics-overview.component.html',
  styleUrls: ['./vouchers-and-packages-analytics-overview.component.sass']
})
export class VouchersAndPackagesAnalyticsOverviewComponent implements OnInit {

  voucherAnalyticsDto!: InvoiceItemAnalyticsDto;
  packageAnalyticsDto!: InvoiceItemAnalyticsDto;
  listOfExpiredPackages: Package[] = [];
  listOfExpiredVouchers: Voucher[] = [];

  expiredPackagesColumns: Column[] = EXPIRED_PACKAGES_COLUMNS;
  expiredVouchersColumns: Column[] = EXPIRED_VOUCHERS_COLUMNS;

  invoiceItemsColumns: Column[] = INVOICE_ITEMS_COLUMNS;

  constructor(private analyticsService: AnalyticsService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getExpiredVouchers();
    this.getVoucherAnalytics();
    this.getPackageAnalytics();
    this.getExpiredPackages();
  }

  getExpiredPackages(event?: string): void {
    this.analyticsService.getExpiredPackages(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.listOfExpiredPackages = resp;
      });
  }

  getVoucherAnalytics(event?: string): void {
    this.analyticsService.getVouchersAnalytics(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.voucherAnalyticsDto = resp;
      });
  }

  getExpiredVouchers(event?: string): void {
    this.analyticsService.getExpiredVouchersAnalytics(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        // @ts-ignore
        this.listOfExpiredVouchers = resp
      });
  }

  getPackageAnalytics(event?: string): void {
    this.analyticsService.getPackagesAnalytics(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.packageAnalyticsDto = resp;
      });
  }

  openVoucherOverviewDialog(element: any): void {
    DialogUtil.openDialog(VoucherOverviewDialogComponent, setDialogConfig({
      height: 'auto',
      width: '40%',
      data: element
    }), this.dialog);
  }
}
