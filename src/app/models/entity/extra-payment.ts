import {Client} from "./client";
import {PaymentMethod} from "./payment-method";
import {Invoice} from "./invoice";

export interface ExtraPayment {
  id?: number;
  description?: string;
  price?: number;
  billedClient?: Client;
  paymentMethod?: PaymentMethod;
  idInvoice: Invoice
}
