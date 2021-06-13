import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Package} from '../models/package';
import {RestRoutesConst} from '../const/const';
import {Observable} from 'rxjs';
import {PaymentMethod} from '../models/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PackageService extends GenericService<Package> {
  route = RestRoutesConst.PACKAGE;

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(RestRoutesConst.API + RestRoutesConst.PACKAGE +
        '/' + RestRoutesConst.PAYMENT_METHOD, {responseType: 'json'});
  }
}
