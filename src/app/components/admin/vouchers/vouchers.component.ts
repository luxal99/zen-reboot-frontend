import {Component, OnInit} from '@angular/core';
import {VoucherService} from '../../../service/voucher.service';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.sass']
})
export class VouchersComponent implements OnInit {

  constructor(private voucherService: VoucherService) {
  }

  ngOnInit(): void {
  }

}
