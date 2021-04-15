import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Appointment} from '../models/appointment';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends GenericService<Appointment> {
  route = RestRoutesConst.APPOINTMENT;
}
