import {Pipe, PipeTransform} from "@angular/core";
import {StaffDto} from "../models/dto/staff-dto";
import * as moment from "moment";
import {AppointmentDTO} from "../models/dto/AppointmentDTO";

@Pipe({
  name: "checkIsAppointmentBetween"
})
export class CheckIsAppointmentBetweenPipe implements PipeTransform {

  transform(roomDto: StaffDto, time: string): AppointmentDTO {
    const currentTime = moment(time, "HH:mm:ss");
    // @ts-ignore
    return roomDto.appointments.find((appointment) =>
      (currentTime.isBetween(moment(appointment.startTime, "HH:mm:ss"), moment(appointment.endTime, "HH:mm:ss")) ||
        currentTime.isSame(moment(appointment.startTime, "HH:mm:ss")) ||
        // @ts-ignore
        currentTime.isSame(moment(appointment.endTime, "HH:mm:ss"))) && (appointment.appointmentStatus.value.toUpperCase() === "NEW"
        // @ts-ignore
        || appointment.appointmentStatus.value.toUpperCase() === "CONFIRMED"));

  }
}
