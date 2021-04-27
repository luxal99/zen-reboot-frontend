import {Pipe, PipeTransform} from '@angular/core';
import {Contact} from '../models/contact';
import {ContactTypeEnum} from '../enums/ContactTypeEnum';

@Pipe({
  name: 'findClientPhoneNumber'
})
export class FindClientPhoneNumberPipe implements PipeTransform {

  transform(contacts: Contact[]): any {
    const contact: Contact = contacts.find((x) => x.type === ContactTypeEnum.PHONE) || {};

    if (contact) {
      return contact.prefix + ' ' + contact.value;
    } else {
      return '';
    }
  }

}
