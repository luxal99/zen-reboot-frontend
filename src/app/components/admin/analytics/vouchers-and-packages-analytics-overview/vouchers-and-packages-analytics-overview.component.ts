import {Component, OnInit} from '@angular/core';
import {Column} from '../../../../models/column';
import {AnalyticsService} from '../../../../service/analytics.service';
import {InvoiceItemAnalyticsDto} from '../../../../models/voucher-package-analytics-dto';
import {Package} from '../../../../models/package';
import {EXPIRED_PACKAGES_COLUMNS, INVOICE_ITEMS_COLUMNS} from '../../../../const/table-column-values';

@Component({
  selector: 'app-vouchers-and-packages-analytics-overview',
  templateUrl: './vouchers-and-packages-analytics-overview.component.html',
  styleUrls: ['./vouchers-and-packages-analytics-overview.component.sass']
})
export class VouchersAndPackagesAnalyticsOverviewComponent implements OnInit {

  voucherAnalyticsDto!: InvoiceItemAnalyticsDto;
  packageAnalyticsDto!: InvoiceItemAnalyticsDto;
  listOfExpiredPackages: Package[] = [];

  expiredPackagesColumns: Column[] = EXPIRED_PACKAGES_COLUMNS;

  invoiceItemsColumns: Column[] = INVOICE_ITEMS_COLUMNS;

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
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

  getPackageAnalytics(event?: string): void {
    this.analyticsService.getPackagesAnalytics(!event ? 'TODAY' : event)
      .subscribe((resp) => {
        this.packageAnalyticsDto = resp;
      });
  }
}
