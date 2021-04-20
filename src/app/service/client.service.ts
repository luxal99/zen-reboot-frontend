import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Client} from '../models/client';
import {RestRoutesConst} from '../const/const';
import {Observable} from 'rxjs';

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
}
