import {Pipe, PipeTransform} from "@angular/core";
import {Invoice} from "../models/entity/invoice";
import {AppointmentStatuses} from "../const/const";

@Pipe({
  name: "sumGross"
})
export class SumGrossPipe implements PipeTransform {

  transform(listOfInvoice: Invoice[]): number {
    let sum = 0;
    // @ts-ignore
    listOfInvoice.filter((inv) => inv.invoiceStatus?.name?.toUpperCase() === AppointmentStatuses.COMPLETED ? sum += inv.gross : sum += 0);
    return sum;
  }

}
