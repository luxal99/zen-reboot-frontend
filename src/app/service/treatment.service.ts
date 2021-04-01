import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Treatment} from '../models/treatment';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService extends GenericService<Treatment> {
  route = RestRoutesConst.TREATMENT;
}
