import {Client} from "../entity/client";
import {PaymentMethod} from "../entity/payment-method";
import {TreatmentDuration} from "../entity/treatment-duration";

export interface VoucherDto {
  client?: Client;
  count?: number;
  discount?: number;
  paymentMethod?: PaymentMethod;
  startDate?: string;
  endDate?: string;
  treatmentDurations?: TreatmentDuration[];
  type?: string;

}
