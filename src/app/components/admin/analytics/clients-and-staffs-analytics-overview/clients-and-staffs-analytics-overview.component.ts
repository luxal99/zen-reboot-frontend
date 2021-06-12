import {Component, OnInit} from '@angular/core';
import {Column} from '../../../../models/column';
import {AnalyticsService} from '../../../../service/analytics.service';
import {TopClientsDto} from '../../../../models/top-clients-dto';
import {TOP_CLIENT_COLUMNS} from '../../../../const/table-column-values';

@Component({
  selector: 'app-clients-and-staffs-analytics-overview',
  templateUrl: './clients-and-staffs-analytics-overview.component.html',
  styleUrls: ['./clients-and-staffs-analytics-overview.component.sass']
})
export class ClientsAndStaffsAnalyticsOverviewComponent implements OnInit {

  topClientsColumns: Column[] = TOP_CLIENT_COLUMNS;
  listOfTopClients: TopClientsDto = {clients: []};

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.getTopClients();
  }

  getTopClients(event?: string): void {
    this.analyticsService.getTopClients(!event ? 'TODAY' : event).subscribe((resp) => {
      this.listOfTopClients = resp;
    });
  }
}
