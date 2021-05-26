import {Client} from './client';
import {PaymentMethod} from './payment-method';

export interface Package {
  id?: number;
  availablePrice?: number;
  availableUsages?: number;
  client?: Client;
  code?: string;
  discount?: number;
  discountType?: string;
  startDate?: string;
  expired?: string;
  location?: Location;
  paymentMethod?: PaymentMethod;
  price?: string;
  treatmentPrice: number;
  treatmentName?: string;
}
