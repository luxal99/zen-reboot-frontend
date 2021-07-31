import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {ExtraPayment} from "../models/entity/extra-payment";
import {RestRoutesConst} from "../const/const";

@Injectable({
  providedIn: "root"
})
export class ExtraPaymentService extends GenericService<ExtraPayment> {
  route = RestRoutesConst.EXTRA_PAYMENT;

}
