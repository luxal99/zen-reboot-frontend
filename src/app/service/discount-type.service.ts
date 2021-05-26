import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class DiscountTypeService extends GenericService<string> {
  route = RestRoutesConst.DISCOUNT_TYPE;
}
