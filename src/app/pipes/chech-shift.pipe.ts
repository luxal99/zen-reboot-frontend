import {Pipe, PipeTransform} from '@angular/core';
import {StaffDto} from '../models/dto/staff-dto';
import {Shift} from '../models/entity/shift';

@Pipe({
  name: 'checkShift'
})
export class CheckShiftPipe implements PipeTransform {

  transform(staffDto: StaffDto, date: any): Shift {
    // @ts-ignore
    return staffDto.shifts?.find((shift) => shift.date === date);
  }

}
