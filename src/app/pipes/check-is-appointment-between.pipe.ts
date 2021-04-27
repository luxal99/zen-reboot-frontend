import {Pipe, PipeTransform} from '@angular/core';
import {StaffDto} from '../models/staff-dto';
import * as moment from 'moment';
import {AppointmentDTO} from '../models/AppointmentDTO';

@Pipe({
  name: 'checkIsAppointmentBetween'
})
export class CheckIsAppointmentBetweenPipe implements PipeTransform {

  transform(roomDto: StaffDto, time: string): AppointmentDTO {
    const currentTime = moment(time, 'HH:mm:ss');
    // @ts-ignore
    const appointmentDto: AppointmentDTO = roomDto.appointments.find((appointment) =>
      currentTime.isBetween(moment(appointment.startTime, 'HH:mm:ss'), moment(appointment.endTime, 'HH:mm:ss')) ||
      currentTime.isSame(moment(appointment.startTime, 'HH:mm:ss')) ||
      currentTime.isSame(moment(appointment.endTime, 'HH:mm:ss')));

    if (appointmentDto && appointmentDto.appointmentStatus?.value === 'NEW') {
      return appointmentDto;
    } else {
      // @ts-ignore
      return null;
    }
  }

}
