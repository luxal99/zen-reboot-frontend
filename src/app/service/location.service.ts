import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends GenericService<Location> {
  route = RestRoutesConst.LOCATION;

}
