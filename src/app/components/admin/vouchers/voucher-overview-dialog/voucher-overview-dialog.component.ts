import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Voucher} from '../../../../models/entity/voucher';
import {DialogUtil} from '../../../../util/dialog-util';
import {ClientOverviewDialogComponent} from '../../client/client-overview-dialog/client-overview-dialog.component';
import {setDialogConfig} from '../../../../util/dialog-options';

@Component({
  selector: 'app-voucher-overview-dialog',
  templateUrl: './voucher-overview-dialog.component.html',
  styleUrls: ['./voucher-overview-dialog.component.sass']
})
export class VoucherOverviewDialogComponent implements OnInit {

  @Input() voucher!: Voucher;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Voucher, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.voucher) {
      this.data = this.voucher;
    }
  }

  openClientOverviewDialog(): void {
    DialogUtil.openDialog(ClientOverviewDialogComponent, setDialogConfig({
      position: {right: '0'},
      width: '95%',
      height: '100vh',
      data: this.data.client
    }), this.dialog);
  }
}
