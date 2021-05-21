import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {PaymentMethod} from '../models/payment-method';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService extends GenericService<PaymentMethod> {
  route = RestRoutesConst.PAYMENT_METHOD;
}
