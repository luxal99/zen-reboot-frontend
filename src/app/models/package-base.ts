import {Client} from './client';
import {PaymentMethod} from './payment-method';

export interface PackageBase {
  id?: number;
  client?: Client;
  paymentMethod?: PaymentMethod;
  location?: Location;
  discount?: number;
  discountType?: string;
  startDate?: string;

}
