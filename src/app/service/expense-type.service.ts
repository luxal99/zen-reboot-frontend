import {Injectable} from '@angular/core';
import {RestRoutesConst} from '../const/const';
import {GenericService} from './generic.service';
import {ExpenseType} from '../models/expense-type';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService extends GenericService<ExpenseType> {
  route = RestRoutesConst.EXPENSE_TYPE;
}
