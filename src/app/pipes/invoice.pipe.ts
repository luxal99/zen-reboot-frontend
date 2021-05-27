import {Pipe, PipeTransform} from '@angular/core';
import {Invoice} from '../models/invoice';

@Pipe({
  name: 'invoice'
})
export class InvoicePipe implements PipeTransform {

  transform(listOfInvoices: Invoice[], searchText: string): Invoice[] {
    if (!listOfInvoices) {
      return [];
    }

    if (!searchText) {
      return listOfInvoices;
    }

    return listOfInvoices.filter((inv) => inv.billedClient?.person?.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
      inv.billedClient?.person?.lastName?.toLowerCase().includes(searchText.toLowerCase()));
  }

}
