import {Pipe, PipeTransform} from '@angular/core';
import {Voucher} from '../models/entity/voucher';
import {Package} from '../models/entity/package';
import {Invoice} from '../models/entity/invoice';

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
