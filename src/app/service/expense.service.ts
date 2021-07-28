import {Injectable} from '@angular/core';
import {RestRoutesConst} from '../const/const';
import {GenericService} from './generic.service';
import {Expense} from '../models/entity/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends GenericService<Expense> {
  route = RestRoutesConst.EXPENSE;
}
