import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumGross'
})
export class SumGrossPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
