import {Component, OnInit} from '@angular/core';
import {VoucherService} from '../../../service/voucher.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {AddVoucherDialogComponent} from './add-voucher-dialog/add-voucher-dialog.component';
import {setDialogConfig} from '../../../util/dialog-options';
import {DefaultComponent} from '../../../util/default-component';
import {Voucher} from '../../../models/voucher';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.sass']
})
export class VouchersComponent extends DefaultComponent<Voucher> implements OnInit {

  displayedColumns = ['code', 'client', 'date', 'type', 'option'];
  searchForm = new FormGroup({
    search: new FormControl('')
  });
  searchText = '';

  constructor(private voucherService: VoucherService, private dialog: MatDialog, protected snackBar: MatSnackBar) {
    super(voucherService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
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
