import {Injectable} from "@angular/core";
import {Voucher} from "../models/entity/voucher";
import {GenericService} from "./generic.service";
import {RestRoutesConst} from "../const/const";
import {Observable} from "rxjs";
import {PaymentMethod} from "../models/entity/payment-method";
import {DateChangeDto} from "../models/dto/DateChangeDto";

@Injectable({
  providedIn: "root"
})
export class VoucherService extends GenericService<Voucher> {
  route = RestRoutesConst.VOUCHER;

  getVoucherPaymentMethod(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(RestRoutesConst.API + this.route + "/payment-methods", {responseType: "json"});
  }

  updateDate(idVoucher: any, dateChangeDto: DateChangeDto): Observable<any> {
    return this.http.put(RestRoutesConst.API + this.route + `/${idVoucher}` + "/update-date", dateChangeDto, {responseType: "json"});
  }
}
