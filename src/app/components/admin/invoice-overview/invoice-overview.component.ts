import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../../../service/invoice.service';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-invoice-overview',
  templateUrl: './invoice-overview.component.html',
  styleUrls: ['./invoice-overview.component.sass']
})
export class InvoiceOverviewComponent implements OnInit {

  currentDate = moment();
  invoiceFilterForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
  }

  getDate(): void {
    console.log(this.invoiceFilterForm.getRawValue());
  }

}
