import {Appointment} from './appointment';
import {Client} from './client';
import {InvoiceStatus} from './invoice-status';

export interface Invoice {
  appointments?: Appointment[];
  billedClient?: Client;
  client?: Client;
  date?: any;
  id?: number
  gross?: number;
  invoiceStatus?: InvoiceStatus;
  tips?: number;
  location?: Location
}
