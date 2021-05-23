import {PaymentMethod} from './payment-method';
import {Client} from './client';

export interface Voucher {
  id?: number;
  code?: string;
  discount?: number;
  count?: number;
  endDate?: string;
  client?: Client;
  startDate?: string;
  initialDiscount?: string;
  paymentMethod: PaymentMethod;
  type: string;
  price: number;
}
