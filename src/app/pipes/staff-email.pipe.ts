import {Pipe, PipeTransform} from '@angular/core';
import {Staff} from '../models/staff';
import {ContactTypeEnum} from '../enums/ContactTypeEnum';
import {Person} from '../models/person';

@Pipe({
  name: 'staffEmail'
})
export class StaffEmailPipe implements PipeTransform {

  transform(person: Person | undefined): string {
    // @ts-ignore
    if (person.contacts.length > 0) {
      // @ts-ignore
      return person.contacts.find((contact) => contact.type === ContactTypeEnum.EMAIL.toString()).value;
    } else {
      return '';
    }
  }

}
