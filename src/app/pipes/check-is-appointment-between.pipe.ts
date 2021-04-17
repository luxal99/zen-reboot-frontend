import {Pipe, PipeTransform} from '@angular/core';
import {StaffDto} from '../models/staff-dto';
import * as moment from 'moment';
import {AppointmentDTO} from '../models/AppointmentDTO';

@Pipe({
  name: 'checkIsAppointmentBetween'
})
export class CheckIsAppointmentBetweenPipe implements PipeTransform {

  transform(staffDto: StaffDto, time: string): string {
    const currentTime = moment(time, 'HH:mm:ss');
    // @ts-ignore
    let appointmentDto: AppointmentDTO = staffDto.appointments.find((appointment) =>
      currentTime.isBetween(moment(appointment.startTime, 'HH:mm:ss'), moment(appointment.endTime, 'HH:mm:ss')) ||
      currentTime.isSame(moment(appointment.startTime, 'HH:mm:ss')) ||
      currentTime.isSame(moment(appointment.endTime, 'HH:mm:ss')));

    if (appointmentDto) {
      appointmentDto.color = staffDto.color;
    } else {
      // @ts-ignore
      appointmentDto = {};
      appointmentDto.color = '#fff';
    }
    // @ts-ignore
    // tslint:disable-next-line:no-bitwise
    return appointmentDto.color;
  }

}
