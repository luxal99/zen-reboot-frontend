import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Invoice} from '../models/invoice';
import {RestRoutesConst} from '../const/const';
import {Appointment} from '../models/appointment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends GenericService<Invoice> {
  route = RestRoutesConst.INVOICE;

  addAppointmentToInvoice(invoiceId: any, appointment: Appointment): Observable<Invoice> {
    return this.http.post<Invoice>(RestRoutesConst.API + this.route + '/' + invoiceId +
      RestRoutesConst.APPOINTMENT, appointment, {responseType: 'json'});
  }

  update(invoice: Invoice, code?: string, paymentMethodName?: string): Observable<Invoice> {
    return this.http.put<Invoice>(RestRoutesConst.API + this.route + (code ? `?${paymentMethodName?.toLowerCase()}=${code}` : ''), invoice,
      {responseType: 'json'});
  }

  getInvoicesDtos(q?: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(RestRoutesConst.API + this.route + '/dtos' + (q ? '?q=' + q : ''), {responseType: 'json'});
  }
}
