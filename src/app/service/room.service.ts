import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Room} from '../models/room';
import {RestRoutesConst} from '../const/const';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends GenericService<Room> {
  route = RestRoutesConst.ROOM;

  getAppointmentsForAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(RestRoutesConst.API + this.route + '/rooms/appointments', {responseType: 'json'});
  }
}
