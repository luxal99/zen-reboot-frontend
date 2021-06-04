import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from 'src/app/service/analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.sass']
})
export class AnalyticsComponent implements OnInit {

  listOfPeriods: string[] = [];

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.getPeriods();
  }

  getPeriods(): void {
    this.analyticsService.getAnalyticPeriods().subscribe((resp) => {
      this.listOfPeriods = resp;

    });
  }
}
