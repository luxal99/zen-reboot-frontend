import {Pipe, PipeTransform} from '@angular/core';
import {Voucher} from '../models/voucher';
import {Package} from '../models/package';

@Pipe({
  name: 'voucherPackage'
})
export class VoucherPackagePipe implements PipeTransform {

  transform(listOfItems: Voucher[] | Package[], searchText: string): any[] {
    if (!listOfItems) {
      return [];
    }
    if (!searchText) {
      return listOfItems;
    }

    // @ts-ignore
    return listOfItems.filter((item: Voucher | Package) => item.code?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.client?.person?.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.client?.person?.lastName?.toLowerCase().includes(searchText.toLowerCase()));
  }

}
