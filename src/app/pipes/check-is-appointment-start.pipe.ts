import {Pipe, PipeTransform} from '@angular/core';
import {StaffDto} from '../models/staff-dto';
import {Appointment} from '../models/appointment';
import * as moment from 'moment';
import {AppointmentDTO} from '../models/AppointmentDTO';

@Pipe({
  name: 'checkIsAppointmentStart'
})
export class CheckIsAppointmentStartPipe implements PipeTransform {
  transform(staffDtoList: StaffDto, time: string): AppointmentDTO {
    // @ts-ignore
    return staffDtoList.appointments?.find((appointment) => moment(time, 'HH:mm:ss').isSame(moment(appointment.startTime, 'HH:mm:ss'))
      // @ts-ignore
      && (appointment.appointmentStatus.value.toUpperCase() === 'NEW' || appointment.appointmentStatus.value.toUpperCase() === 'CONFIRMED'));
  }
}
