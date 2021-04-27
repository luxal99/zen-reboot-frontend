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
}
