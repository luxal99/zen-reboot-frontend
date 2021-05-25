import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Package} from '../models/package';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class PackageService extends GenericService<Package> {
  route = RestRoutesConst.PACKAGE;
}
