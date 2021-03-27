import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Client} from '../models/client';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends GenericService<Client> {
  route = RestRoutesConst.CLIENT;
}
