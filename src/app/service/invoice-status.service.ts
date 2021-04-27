import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {InvoiceStatus} from '../models/invoice-status';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStatusService extends GenericService<InvoiceStatus> {
  route = RestRoutesConst.INVOICE_STATUS;
}
