import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Column} from '../../../../models/column';
import {FormControl, FormGroup} from '@angular/forms';
import {AnalyticsService} from '../../../../service/analytics.service';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {SpinnerService} from '../../../../service/spinner.service';
import {MatSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-generic-analytics-table',
  templateUrl: './generic-analytics-table.component.html',
  styleUrls: ['./generic-analytics-table.component.sass']
})
export class GenericAnalyticsTableComponent implements OnInit {

  @Input() dataSource: any[] = [];
  @Input() displayedColumns: Column[] = [];
  @Input() elementBindingValues: string[] = [];

  @Output() filterFunction = new EventEmitter();
  @Output() openOverview = new EventEmitter();
  @ViewChild('spinner') spinner!: MatSpinner;

  filterForm = new FormGroup({
    period: new FormControl('')
  });

  periodSelectConfig: FieldConfig = {name: FormControlNames.PERIOD_FORM_CONTROL, type: InputTypes.SELECT_TYPE_NAME, label: 'Izbor perioda'};

  constructor(private analyticsService: AnalyticsService, private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.getPeriods();
  }

  getPeriods(): void {
    this.analyticsService.getAnalyticPeriods().subscribe((resp) => {
      this.periodSelectConfig.options = resp;
    });
  }

  filterOnChange(): void {
    this.spinnerService.show(this.spinner);
    this.filterFunction.emit(this.filterForm.get(FormControlNames.PERIOD_FORM_CONTROL)?.value);
    this.spinnerService.hide(this.spinner);
  }

  openDialog(el: any): void {
    this.openOverview.emit(el);
  }
}
