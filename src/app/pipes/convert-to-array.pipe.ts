import {Pipe, PipeTransform} from '@angular/core';
import {isArray} from "rxjs/internal-compatibility";

@Pipe({
  name: 'convertToArray'
})
export class ConvertToArrayPipe implements PipeTransform {

  transform(arr: any[]): any[] {
    return isArray(arr[0]) ? arr[0] : arr
  }

}
