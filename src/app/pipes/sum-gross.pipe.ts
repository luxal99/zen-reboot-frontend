import {Pipe, PipeTransform} from '@angular/core';
import {Invoice} from '../models/invoice';

@Pipe({
  name: 'sumGross'
})
export class SumGrossPipe implements PipeTransform {

  transform(listOfInvoice: Invoice[]): number {
    let sum = 0;
    // @ts-ignore
    listOfInvoice.filter((inv) => sum += inv.gross);
    return sum;
  }

}
