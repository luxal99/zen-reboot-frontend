import {Component, OnInit} from '@angular/core';
import {PeriodsService} from './service/periods.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'zen-frontend';

  constructor(private periodService: PeriodsService) {
  }

  async ngOnInit(): Promise<void> {
    await this.periodService.getPeriods();
  }
}
