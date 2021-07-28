import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {TreatmentCategory} from '../models/entity/treatment-category';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class TreatmentCategoryService extends GenericService<TreatmentCategory> {
  route = RestRoutesConst.TREATMENT_CATEGORY;
}
