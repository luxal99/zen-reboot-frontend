import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Shift} from '../models/shift';
import {RestRoutesConst} from '../const/const';
import {StaffDto} from '../models/staff-dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends GenericService<Shift> {
  route = RestRoutesConst.SHIFT;

  generateMultipleShifts(dto: StaffDto): Observable<StaffDto> {
    return this.http.post<StaffDto>(RestRoutesConst.API + this.route + '/generate', dto, {responseType: 'json'});
  }
}
