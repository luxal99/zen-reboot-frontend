import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Treatment} from '../models/treatment';
import {RestRoutesConst} from '../const/const';
import {Observable} from 'rxjs';
import {TreatmentDuration} from '../models/treatment-duration';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService extends GenericService<Treatment> {
  route = RestRoutesConst.TREATMENT;

  getTreatmentDurations(treatmentId: number): Observable<TreatmentDuration[]> {
    return this.http.get<TreatmentDuration[]>(RestRoutesConst.API + this.route + '/' + treatmentId + '/durations', {responseType: 'json'});
  }
}
