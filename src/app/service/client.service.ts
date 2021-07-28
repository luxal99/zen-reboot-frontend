import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Client} from '../models/entity/client';
import {RestRoutesConst} from '../const/const';
import {Observable} from 'rxjs';
import {AppointmentDTO} from '../models/dto/AppointmentDTO';
import {Invoice} from '../models/entity/invoice';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends GenericService<Client> {
  route = RestRoutesConst.CLIENT;

  getPaginationClients(numberOfPage: number, gap?: number): Observable<Client[]> {
    if (!gap) {
      gap = 10;
    }
    return this.http.get<Client[]>(RestRoutesConst.API + this.route + `?page=${numberOfPage},${gap}`);
  }

  findAppointmentsForClient(idClient: number): Observable<AppointmentDTO[]> {
    return this.http.get<AppointmentDTO[]>(RestRoutesConst.API + this.route + '/'
        + idClient + '/' + RestRoutesConst.APPOINTMENT, {responseType: 'json'});
  }

  findInvoicesForClient(idClient: any): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(RestRoutesConst.API + RestRoutesConst.CLIENT + '/'
        + idClient + '/' + RestRoutesConst.INVOICE + '/billed', {responseType: 'json'});
  }
}
