import {Appointment} from './appointment';
import {Treatment} from './treatment';

// tslint:disable-next-line:no-empty-interface
export interface AppointmentDTO extends Appointment {
  color?: string;
  treatment: Treatment;
}
