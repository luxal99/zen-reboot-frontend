import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {SalaryCategory} from "../models/entity/salary-category";
import {RestRoutesConst} from "../const/const";

@Injectable({
  providedIn: "root"
})
export class SalaryCategoryService extends GenericService<SalaryCategory> {
  route = RestRoutesConst.SALARY_CATEGORIES;
}
