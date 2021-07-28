import {Person} from "./person";
import {SalaryCategory} from "./salary-category";

export interface Staff {
  createdDate?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  person?: Person;
  color?: string;
  startDate?: string;
  endDate?: string;
  salaryCategory?: SalaryCategory
}

