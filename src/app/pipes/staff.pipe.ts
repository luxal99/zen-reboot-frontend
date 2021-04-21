import {Pipe, PipeTransform} from '@angular/core';
import {Staff} from '../models/staff';


@Pipe({
  name: 'staff'
})
export class StaffPipe implements PipeTransform {

  transform(listOfStaff: Staff[], searchText: string): any {
    if (!listOfStaff) {
      return [];
    }
    if (!searchText) {
      return listOfStaff;
    }
    return listOfStaff.filter((staff) =>
      staff.person?.firstName?.toLowerCase().startsWith(searchText.toLowerCase())
      || staff.person?.lastName?.startsWith(searchText.toLowerCase()));

  }

}
