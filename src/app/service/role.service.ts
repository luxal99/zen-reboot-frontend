import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Role} from '../models/util/role';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends GenericService<Role> {
  route = RestRoutesConst.ROLE;
}
