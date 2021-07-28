import {Pipe, PipeTransform} from '@angular/core';
import {StaffDto} from '../models/dto/staff-dto';
import {Appointment} from '../models/entity/appointment';
import * as moment from 'moment';
import {AppointmentDTO} from '../models/dto/AppointmentDTO';

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
