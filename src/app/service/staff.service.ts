import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Staff} from '../models/staff';
import {RestRoutesConst} from '../const/const';
import {Observable} from 'rxjs';
import {StaffDto} from '../models/staff-dto';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends GenericService<Staff> {
  route = RestRoutesConst.STAFF;

  getStaffsShifts(urlEncoded: string): Observable<StaffDto[]> {
    return this.http.get<StaffDto[]>(RestRoutesConst.API + this.route + '/shifts' + '?q=' + urlEncoded, {responseType: 'json'});
  }
}
