import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {RestRoutesConst} from '../const/const';
import {Location} from '../models/location';
import {Observable} from 'rxjs';
import {RoomDto} from '../models/room-dto';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends GenericService<Location> {
  route = RestRoutesConst.LOCATION;

  getAppointmentPerRoom(id: any, date: string): Observable<RoomDto[]> {
    return this.http.get<RoomDto[]>(RestRoutesConst.API + this.route + '/' + id + '/rooms' + '?q=' + date, {responseType: 'json'});
  }

}
