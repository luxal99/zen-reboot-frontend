import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {TreatmentDuration} from '../models/entity/treatment-duration';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class TreatmentDurationService extends GenericService<TreatmentDuration> {
  route = RestRoutesConst.TREATMENT_DURATION;
}
