import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Room} from '../models/entity/room';
import {RestRoutesConst} from '../const/const';
import {Observable} from 'rxjs';
import {RoomDto} from '../models/dto/room-dto';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends GenericService<Room> {
  route = RestRoutesConst.ROOM;

  getAppointmentsForAllRooms(q?: string): Observable<RoomDto[]> {
    return this.http.get<RoomDto[]>(RestRoutesConst.API + this.route + '/appointments' + (q ? `?q=${q}` : ''), {responseType: 'json'});
  }
}
