import {Appointment} from './appointment';
import {Client} from './client';
import {InvoiceStatus} from './invoice-status';
import {PaymentMethod} from './payment-method';

export interface Invoice {
  items?: any[];
  appointments?: Appointment[]
  billedClient?: Client;
  clients?: Client[];
  checkoutDate?: string
  date?: any;
  id?: number
  gross?: number;
  invoiceStatus?: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  tips?: number;
  location?: Location
}
