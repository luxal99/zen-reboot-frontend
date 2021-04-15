import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(word: any): string | undefined {
    if (typeof word === 'number' || !word) {
      return word;
    } else {
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
  }
}
