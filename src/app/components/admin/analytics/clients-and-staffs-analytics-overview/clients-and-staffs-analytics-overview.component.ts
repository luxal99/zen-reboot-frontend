import {Component, OnInit} from '@angular/core';
import {Column} from '../../../../models/column';
import {AnalyticsService} from '../../../../service/analytics.service';
import {TopClientsDto} from '../../../../models/top-clients-dto';
import * as ColumnDef from '../../../../const/table-column-values';
import {Client} from '../../../../models/client';
import {StaffEarnedDto} from '../../../../models/staff-earned-dto';

@Component({
  selector: 'app-clients-and-staffs-analytics-overview',
  templateUrl: './clients-and-staffs-analytics-overview.component.html',
  styleUrls: ['./clients-and-staffs-analytics-overview.component.sass']
})
export class ClientsAndStaffsAnalyticsOverviewComponent implements OnInit {

  topClientsColumns: Column[] = ColumnDef.TOP_CLIENTS_COLUMNS;
  returningClientsColumns: Column[] = ColumnDef.RETURNING_CLIENTS_COLUMNS;
  staffEarnedClientsColumns: Column[] = ColumnDef.STAFF_EARNED_COLUMNS;

  listOfTopClients: TopClientsDto = {clients: []};
  listOfReturningClients: Client[] = [];
  listOfStaffEarned: StaffEarnedDto[] = [];

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.getTopClients();
    this.getReturningClients();
    this.getStaffEarnedAnalytics();
  }

  getTopClients(event?: string): void {
    this.analyticsService.getTopClients(!event ? 'TODAY' : event).subscribe((resp) => {
      this.listOfTopClients = resp;
    });
  }

  getReturningClients(event?: string): void {
    this.analyticsService.getReturningClients(!event ? 'TODAY' : event).subscribe((resp) => {
      this.listOfReturningClients = resp;
    });
  }

  getStaffEarnedAnalytics(event?: string): void {
    this.analyticsService.getAllStaffEarned(!event ? 'TODAY' : event).subscribe((resp) => {
      this.listOfStaffEarned = resp;
    });
  }
}
