import {Pipe, PipeTransform} from '@angular/core';
import {Staff} from '../models/entity/staff';
import {ContactTypeEnum} from '../enums/ContactTypeEnum';
import {Person} from '../models/entity/person';

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
