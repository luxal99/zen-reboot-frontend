import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Invoice} from '../../../models/invoice';

@Component({
  selector: 'app-invoices-dialog-overview',
  templateUrl: './invoices-dialog-overview.component.html',
  styleUrls: ['./invoices-dialog-overview.component.sass']
})
export class InvoicesDialogOverviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Invoice) {
  }

  ngOnInit(): void {
  }

}
