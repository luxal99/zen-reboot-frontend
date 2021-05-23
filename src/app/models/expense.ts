import {ExpenseType} from './expense-type';

export interface Expense {
  id?: number;
  name?: string;
  type?: ExpenseType;
  value?: number;
}
