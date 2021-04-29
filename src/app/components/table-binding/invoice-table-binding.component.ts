import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../util/dialog-util';
import {InvoicesDialogOverviewComponent} from './invoices-dialog-overview/invoices-dialog-overview.component';
import {Invoice} from '../../models/invoice';

@Component({
  selector: 'app-table-binding',
  templateUrl: './invoice-table-binding.component.html',
  styleUrls: ['./invoice-table-binding.component.sass']
})
export class InvoiceTableBindingComponent implements OnInit {

  displayedColumns: string[] = ['client', 'billedClient', 'location', 'gross', 'option'];
  @Input() dataSource: any[] = [];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openInvoiceDialogOverview(data: Invoice): void {
    DialogUtil.openDialog(InvoicesDialogOverviewComponent, {
      height: '100%',
      width: '40%',
      position: {right: '0'},
      data
    }, this.dialog);
  }
}
