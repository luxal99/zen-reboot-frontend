import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldConfig} from "../../../../models/util/FIeldConfig";
import {FormControlNames, InputTypes} from "../../../../const/const";
import {PeriodsService} from "../../../../service/periods.service";
import {InvoiceItemAnalyticsDto} from "../../../../models/dto/voucher-package-analytics-dto";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dto-generic-overview',
  templateUrl: './dto-generic-overview.component.html',
  styleUrls: ['./dto-generic-overview.component.sass']
})
export class DtoGenericOverviewComponent implements OnInit {

  @Input() title = '';
  @Input() dto: InvoiceItemAnalyticsDto = {};
  @Output() filter = new EventEmitter();


  filterForm = new FormGroup({
    period: new FormControl('TODAY')
  });

  constructor(private periodService: PeriodsService) {
  }

  periodSelectConfig: FieldConfig = {
    name: FormControlNames.PERIOD_FORM_CONTROL,
    type: InputTypes.SELECT_TYPE_NAME, label: 'Izbor perioda', options: this.periodService.listOfPeriods
  };

  ngOnInit(): void {
  }

  filterPeriod(): void {
    this.filter.emit(this.filterForm.get(FormControlNames.PERIOD_FORM_CONTROL)?.value)
  }

}
