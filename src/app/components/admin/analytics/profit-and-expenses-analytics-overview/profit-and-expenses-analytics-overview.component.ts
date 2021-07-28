import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from '../../../../service/analytics.service';
import {ProfitDto} from '../../../../models/dto/profit-dto';
import {FormControl, FormGroup} from '@angular/forms';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {FieldConfig} from '../../../../models/util/FIeldConfig';
import {PeriodsService} from '../../../../service/periods.service';
import {ExpensesAnalyticsDto} from '../../../../models/dto/expenses-analytics-dto';

@Component({
  selector: 'app-profit-and-expenses-analytics-overview',
  templateUrl: './profit-and-expenses-analytics-overview.component.html',
  styleUrls: ['./profit-and-expenses-analytics-overview.component.sass']
})
export class ProfitAndExpensesAnalyticsOverviewComponent implements OnInit {

  profitAnalytics: ProfitDto = {};
  expenseAnalytics: ExpensesAnalyticsDto = {};

  filterForm = new FormGroup({
    period: new FormControl('TODAY')
  });

  periodSelectConfig: FieldConfig = {
    name: FormControlNames.PERIOD_FORM_CONTROL,
    type: InputTypes.SELECT_TYPE_NAME, label: 'Izbor perioda', options: this.periodService.listOfPeriods
  };


  constructor(private analyticsService: AnalyticsService, private periodService: PeriodsService) {
  }

  ngOnInit(): void {
    this.getProfitAnalytics();
    this.getExpensesAnalytics();
  }

  getProfitAnalytics(): void {
    this.analyticsService.getAnalyticsProfit(this.filterForm.get(FormControlNames.PERIOD_FORM_CONTROL)?.value).subscribe((resp) => {
      this.profitAnalytics = resp;
    });
  }

  getExpensesAnalytics(): void {
    this.analyticsService.getAnalyticsExpenses(this.filterForm.get(FormControlNames.PERIOD_FORM_CONTROL)?.value)
      .subscribe((resp) => {
        this.expenseAnalytics = resp;
      });
  }

}
