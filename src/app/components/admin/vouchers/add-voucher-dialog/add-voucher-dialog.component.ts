import {Component, Inject, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {Voucher} from '../../../../models/voucher';
import {VoucherService} from '../../../../service/voucher.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-voucher-dialog',
  templateUrl: './add-voucher-dialog.component.html',
  styleUrls: ['./add-voucher-dialog.component.sass']
})
export class AddVoucherDialogComponent extends DefaultComponent<Voucher> implements OnInit {

  voucherForm = new FormGroup({
    client: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    count: new FormControl(),
    discount: new FormControl(),
    paymentMethod: new FormControl('', Validators.required),
    startDate: new FormControl(this.data ? this.data.startDate : new Date())
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Voucher, private voucherService: VoucherService, protected snackBar: MatSnackBar) {
    super(voucherService, snackBar);
  }

  ngOnInit(): void {
  }

  save(): void {

  }

}
