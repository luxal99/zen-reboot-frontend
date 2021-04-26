import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Invoice} from '../models/invoice';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends GenericService<Invoice> {
  route = RestRoutesConst.INVOICE;
}
