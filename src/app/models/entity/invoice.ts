import {Appointment} from "./appointment";
import {Client} from "./client";
import {InvoiceStatus} from "./invoice-status";
import {PaymentMethod} from "./payment-method";
import {ExtraPayment} from "./extra-payment";

export interface Invoice {
  items?: any[];
  appointments?: Appointment[];
  billedClient?: Client;
  clients?: Client[];
  createDate?: string;
  checkoutDate?: string;
  extraPayments?: ExtraPayment[];
  date?: any;
  id?: number;
  gross?: number;
  invoiceStatus?: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  tips?: number;
  type?: string;
  location?: Location;
}
