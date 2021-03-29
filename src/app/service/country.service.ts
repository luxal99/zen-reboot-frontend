import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Country} from '../models/country';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends GenericService<Country> {
  route = RestRoutesConst.COUNTRY;

}
