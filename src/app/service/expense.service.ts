import {Injectable} from "@angular/core";
import {RestRoutesConst} from "../const/const";
import {GenericService} from "./generic.service";
import {Expense} from "../models/entity/expense";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ExpenseService extends GenericService<Expense> {
  route = RestRoutesConst.EXPENSE;

  getAllExpensesWithPagination(page: number, query?: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(RestRoutesConst.API + this.route +
      `?page=${page}` + (query ? `&q=${query}` : ""), {responseType: "json"});
  }
}
