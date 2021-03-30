import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {City} from '../models/city';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class CityService extends GenericService<City> {
  route = RestRoutesConst.CITY;
}
