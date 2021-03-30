import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'client'
})
export class ClientPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
