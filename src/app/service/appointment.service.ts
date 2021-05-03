import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Appointment} from '../models/appointment';
import {RestRoutesConst} from '../const/const';
import {Observable} from 'rxjs';
import {Invoice} from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends GenericService<Appointment> {
  route = RestRoutesConst.APPOINTMENT;

  findInvoiceForAppointment(idAppointment: any): Observable<Invoice> {
    return this.http.get<Invoice>(RestRoutesConst.API + this.route + '/' + idAppointment + '/' + RestRoutesConst.INVOICE, {responseType: 'json'});
  }

  setCompleteStatus(id: any): Observable<Appointment> {
    return this.http.put<Appointment>(RestRoutesConst.API + this.route + '/' + id + '/complete', {}, {responseType: 'json'});
  }
}
