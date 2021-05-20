import {Injectable} from '@angular/core';
import {Voucher} from '../models/voucher';
import {GenericService} from './generic.service';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class VoucherService extends GenericService<Voucher> {
  route = RestRoutesConst.VOUCHER;

}
