import {Component, OnInit} from '@angular/core';
import {VoucherService} from '../../../service/voucher.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {AddVoucherDialogComponent} from './add-voucher-dialog/add-voucher-dialog.component';
import {setDialogConfig} from '../../../util/dialog-options';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.sass']
})
export class VouchersComponent implements OnInit {

  constructor(private voucherService: VoucherService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openAddVoucherDialog(): void {
    DialogUtil.openDialog(AddVoucherDialogComponent, setDialogConfig({
      position: {right: '0'},
      height: '100vh',
      width: '40%',
      maxWidth: '40%',
    }), this.dialog);
  }

}
