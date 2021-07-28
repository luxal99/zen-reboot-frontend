import {Component, OnInit} from '@angular/core';
import {Column} from '../../../../models/util/column';
import {AnalyticsService} from '../../../../service/analytics.service';
import {TopClientsDto} from '../../../../models/dto/top-clients-dto';
import * as ColumnDef from '../../../../const/table-column-values';
import {Client} from '../../../../models/entity/client';
import {StaffEarnedDto} from '../../../../models/dto/staff-earned-dto';
import {DialogUtil} from '../../../../util/dialog-util';
import {ClientOverviewDialogComponent} from '../../client/client-overview-dialog/client-overview-dialog.component';
import {setDialogConfig} from '../../../../util/dialog-options';
import {MatDialog} from '@angular/material/dialog';
import {
  RETURNING_CLIENTS_COLUMNS,
  STAFF_EARNED_COLUMNS,
  TOP_CLIENTS_COLUMNS
} from '../../../../const/table-column-values';

@Component({
  selector: 'app-clients-and-staffs-analytics-overview',
  templateUrl: './clients-and-staffs-analytics-overview.component.html',
  styleUrls: ['./clients-and-staffs-analytics-overview.component.sass']
})
export class ClientsAndStaffsAnalyticsOverviewComponent implements OnInit {

  topClientsColumns: Column[] = TOP_CLIENTS_COLUMNS;
  returningClientsColumns: Column[] = RETURNING_CLIENTS_COLUMNS;
  staffEarnedClientsColumns: Column[] = STAFF_EARNED_COLUMNS;

  listOfTopClients: TopClientsDto = {clients: []};
  listOfReturningClients: Client[] = [];
  listOfStaffEarned: StaffEarnedDto[] = [];

  constructor(private analyticsService: AnalyticsService, private dialog: MatDialog) {
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

  openClientOverviewDialog(data: any): void {
    DialogUtil.openDialog(ClientOverviewDialogComponent,
      setDialogConfig({
        position: {right: '0'},
        width: '95%',
        height: '100vh',
        data
      }), this.dialog);
  }
}
