import {Injectable} from '@angular/core';
import {Voucher} from '../models/voucher';
import {GenericService} from './generic.service';
import {RestRoutesConst} from '../const/const';
import {Observable} from 'rxjs';
import {PaymentMethod} from '../models/payment-method';

@Injectable({
  providedIn: 'root'
})
export class VoucherService extends GenericService<Voucher> {
  route = RestRoutesConst.VOUCHER;

  getVoucherPaymentMethod(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(RestRoutesConst.API + this.route + '/payment-methods', {responseType: 'json'});
  }
}
