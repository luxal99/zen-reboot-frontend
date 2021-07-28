import {Pipe, PipeTransform} from "@angular/core";
import {StaffPayoutDto} from "../models/dto/staff-payout-dto";

@Pipe({
  name: "staffPayout"
})
export class StaffPayoutPipe implements PipeTransform {

  transform(listOfPayouts: StaffPayoutDto[], searchText: string): StaffPayoutDto[] {

    if (!listOfPayouts) {
      return [];
    }
    if (!searchText) {
      return listOfPayouts;
    }
    return listOfPayouts.filter((item) =>
      // @ts-ignore
      item.staff.person?.firstName?.toLowerCase().includes(searchText) ||
      // @ts-ignore
      item.staff.person?.lastName?.toLowerCase().toLowerCase().includes(searchText.toLowerCase()));
  }

}
