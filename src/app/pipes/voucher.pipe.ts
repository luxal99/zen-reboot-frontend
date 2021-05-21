import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voucher'
})
export class VoucherPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
