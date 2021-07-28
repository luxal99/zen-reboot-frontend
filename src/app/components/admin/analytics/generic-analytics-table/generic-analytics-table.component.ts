import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Column} from '../../../../models/util/column';
import {FormControl, FormGroup} from '@angular/forms';
import {AnalyticsService} from '../../../../service/analytics.service';
import {FieldConfig} from '../../../../models/util/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {SpinnerService} from '../../../../service/spinner.service';
import {MatSpinner} from '@angular/material/progress-spinner';
import {PeriodsService} from '../../../../service/periods.service';
import {isArray} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-generic-analytics-table',
  templateUrl: './generic-analytics-table.component.html',
  styleUrls: ['./generic-analytics-table.component.sass']
})
export class GenericAnalyticsTableComponent implements OnInit {

  @Input() dataSource: any;
  @Input() displayedColumns: Column[] = [];
  @Input() isStaffTable = false;

  @Output() filterFunction = new EventEmitter();
  @Output() openOverview = new EventEmitter();
  @ViewChild('spinner') spinner!: MatSpinner;

  filterForm = new FormGroup({
    period: new FormControl('')
  });

  periodSelectConfig: FieldConfig = {
    name: FormControlNames.PERIOD_FORM_CONTROL,
    type: InputTypes.SELECT_TYPE_NAME, label: 'Izbor perioda', options: this.periodService.listOfPeriods
  };

  constructor(private analyticsService: AnalyticsService, private spinnerService: SpinnerService, private periodService: PeriodsService) {
  }

  ngOnInit(): void {
    if (this.dataSource) {
      if (isArray(this.dataSource)) {
        this.dataSource = this.dataSource[0]
      }
      setTimeout(() => {
        this.spinnerService.hide(this.spinner);
      }, 100);
    }
  }

  filterOnChange(): void {
    this.spinnerService.show(this.spinner);
    this.filterFunction.emit(this.filterForm.get(FormControlNames.PERIOD_FORM_CONTROL)?.value);
    this.spinnerService.hide(this.spinner);
    if (isArray(this.dataSource[0])) {
      this.dataSource = this.dataSource[0]
    }
  }

  openDialog(el: any): void {
    this.openOverview.emit(el);
  }
}
