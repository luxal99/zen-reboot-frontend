import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {AppointmentStatus} from '../models/entity/appointment-status';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class AppointmentStatusService extends GenericService<AppointmentStatus> {
  route = RestRoutesConst.APPOINTMENT_STATUS;
}
