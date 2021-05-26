import {Client} from './client';
import {TreatmentDuration} from './treatment-duration';
import {Location} from './location';
import {PaymentMethod} from './payment-method';

export interface PackageDto {
  client?: Client;
  count?: number;
  discount?: number;
  startDate: string;
  treatmentDuration: TreatmentDuration;
  location: Location;
  paymentMethod: PaymentMethod
}
