import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoice'
})
export class InvoicePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
