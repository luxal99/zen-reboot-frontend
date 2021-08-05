import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Package} from "../models/entity/package";
import {RestRoutesConst} from "../const/const";
import {Observable} from "rxjs";
import {PaymentMethod} from "../models/entity/payment-method";
import {DateChangeDto} from "../models/dto/DateChangeDto";

@Injectable({
  providedIn: "root"
})
export class PackageService extends GenericService<Package> {
  route = RestRoutesConst.PACKAGE;

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(RestRoutesConst.API + RestRoutesConst.PACKAGE +
      "/" + RestRoutesConst.PAYMENT_METHOD, {responseType: "json"});
  }

  updateDate(idPackage: any, dateChangeDto: DateChangeDto): Observable<any> {
    return this.http.put(RestRoutesConst.API + this.route + `/${idPackage}` + "/update-date", dateChangeDto, {responseType: "json"});
  }
}
