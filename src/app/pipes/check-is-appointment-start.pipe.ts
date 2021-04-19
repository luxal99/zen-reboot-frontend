import {Pipe, PipeTransform} from '@angular/core';
import {StaffDto} from '../models/staff-dto';
import {Appointment} from '../models/appointment';
import * as moment from 'moment';

@Pipe({
  name: 'checkIsAppointmentStart'
})
export class CheckIsAppointmentStartPipe implements PipeTransform {

  transform(staffDtoList: StaffDto, time: string): Appointment {
    // @ts-ignore
    return staffDtoList.appointments?.find((appointment) => moment(time, 'HH:mm:ss').isSame(moment(appointment.startTime, 'HH:mm:ss')));
  }

}
