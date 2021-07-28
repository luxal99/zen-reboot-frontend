import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Payout} from "src/app/models/payout";
import {RestRoutesConst} from "../const/const";
import {Observable} from "rxjs";
import {StaffPayoutDto} from "../models/staff-payout-dto";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class PayoutService extends GenericService<Payout> {
  route = RestRoutesConst.PAYOUT;

  getStaffSalary(month?: any, year?: any): Observable<StaffPayoutDto[]> {
    if (!month) {
      month = moment().month() + 1;
    }
    if (!year) {
      year = moment().year();
    }
    return this.http.get<StaffPayoutDto[]>(RestRoutesConst.API + this.route + "/dtos",
      {
        responseType: "json", params: {
          month,
          year
        }
      });
  }
}
