import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../../../service/invoice.service';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {CriteriaBuilder} from '../../../util/criteria-builder';
import {Invoice} from '../../../models/invoice';
import {DefaultComponent} from '../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice-overview',
  templateUrl: './invoice-overview.component.html',
  styleUrls: ['./invoice-overview.component.sass']
})
export class InvoiceOverviewComponent extends DefaultComponent<Invoice> implements OnInit {

  listOfCurrentWeekInvoices: Invoice[] = [];
  listOfCurrentDayInvoices: Invoice[] = [];


  startDate: moment.Moment = moment().startOf('isoWeek');
  endDate: moment.Moment = moment().endOf('isoWeek');
  currentDate = moment();

  invoiceFilterForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  constructor(private invoiceService: InvoiceService, protected snackBar: MatSnackBar) {
    super(invoiceService, snackBar);
  }

  ngOnInit(): void {
    this.getCurrentWeekOverview();
    this.getCurrentDayOverview();
  }

  getCurrentWeekOverview(): void {
    const queryBuilder = new CriteriaBuilder();
    // @ts-ignore
    queryBuilder.gt('date', new Date(this.startDate).valueOf()).and()
      // @ts-ignore
      .lt('date', new Date(this.endDate).valueOf());
    this.invoiceService.getAll(queryBuilder.buildUrlEncoded()).subscribe((resp) => {
      this.listOfCurrentWeekInvoices = resp;
      this.spinnerService.hide(this.spinner);
    });
  }

  getCurrentDayOverview(): void {
    this.invoiceService.getAll(new CriteriaBuilder().eq('date',
      new Date(this.currentDate.format('YYYY-MM-DD')).valueOf()).buildUrlEncoded()).subscribe((resp) => {
      this.listOfCurrentDayInvoices = resp;
    });
  }

  getDate(): void {

  }

}
