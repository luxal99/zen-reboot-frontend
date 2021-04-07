import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Staff} from '../models/staff';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends GenericService<Staff> {
  route = RestRoutesConst.STAFF;
}
