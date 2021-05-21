import {PaymentMethod} from './payment-method';

export interface Voucher {
  id?: number;
  code?: string;
  discount?: number;
  endDate?: string;
  startDate?: string;
  initialDiscount?: string;
  paymentMethod: PaymentMethod;
  type: string;
}
