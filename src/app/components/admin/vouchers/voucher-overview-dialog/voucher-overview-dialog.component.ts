import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Voucher} from '../../../../models/voucher';
import * as moment from 'moment';

@Component({
  selector: 'app-voucher-overview-dialog',
  templateUrl: './voucher-overview-dialog.component.html',
  styleUrls: ['./voucher-overview-dialog.component.sass']
})
export class VoucherOverviewDialogComponent implements OnInit {

  @Input() voucher!: Voucher;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Voucher) {
  }

  ngOnInit(): void {
    if (this.voucher) {
      this.data = this.voucher;
    }
  }

}
