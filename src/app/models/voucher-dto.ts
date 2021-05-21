import {Client} from './client';
import {PaymentMethod} from './payment-method';
import {TreatmentDuration} from './treatment-duration';

export interface VoucherDto {
  client?: Client;
  count?: number;
  discount?: number;
  paymentMethod?: PaymentMethod;
  startDate?: string;
  treatmentDuration?: TreatmentDuration;
  type?: string;

}
