import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Room} from '../models/room';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends GenericService<Room> {
  route = RestRoutesConst.ROOM;
}
