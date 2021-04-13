import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Shift} from '../models/shift';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends GenericService<Shift> {
  route = RestRoutesConst.SHIFT;
}
