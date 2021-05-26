import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'package'
})
export class PackagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
