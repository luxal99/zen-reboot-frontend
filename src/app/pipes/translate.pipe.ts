import {Pipe, PipeTransform} from '@angular/core';
import {isNumeric} from 'rxjs/internal-compatibility';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: any): any {
    let valueToUpperCase = ''
    if (!isNumeric(value)) {
      valueToUpperCase = value.toUpperCase();
    }
    if (!value) {
      return '';
    }


    if (valueToUpperCase === 'PERCENT') {
      return 'Procenat';
    } else if (valueToUpperCase === 'FLAT') {
      return 'Fiksno';
    } else if (valueToUpperCase === 'NONE') {
      return 'Nijedan';
    } else if (valueToUpperCase === 'CASH') {
      return 'Keš';
    } else if (valueToUpperCase === 'CARD') {
      return 'Kartica';
    } else if (valueToUpperCase === 'ACCOUNT PAYMENT') {
      return 'Plaćanje preko računa';
    } else if (valueToUpperCase === 'DISCOUNT') {
      return 'Popust';
    } else if (valueToUpperCase === 'VOUCHER') {
      return 'Vaučer';
    } else if (valueToUpperCase === 'ONLINE VOUCHER') {
      return 'Online vaučer';
    } else if (valueToUpperCase === 'PACKAGE') {
      return 'Paket';
    } else if (valueToUpperCase === 'POINT OF SALE') {
      return 'Na licu mesta';
    } else if (valueToUpperCase === 'NEW') {
      return 'Novi';
    } else if (valueToUpperCase === 'CANCELED') {
      return 'Otkazan';
    } else if (valueToUpperCase === 'COMPLETED') {
      return 'Kompletiran';
    } else if (valueToUpperCase === 'CONFIRMED') {
      return 'Potvrđen';
    } else {
      return value;
    }
  }

}
