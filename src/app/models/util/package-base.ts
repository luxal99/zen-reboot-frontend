import {Client} from '../entity/client';
import {PaymentMethod} from '../entity/payment-method';

export interface PackageBase {
  id?: number;
  client?: Client;
  paymentMethod?: PaymentMethod;
  location?: Location;
  discount?: number;
  discountType?: string;
  startDate?: string;

}
