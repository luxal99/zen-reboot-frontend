import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from 'src/app/service/analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.sass']
})
export class AnalyticsComponent implements OnInit {

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
  }

}
