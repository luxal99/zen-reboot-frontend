import {AppointmentStatus} from './appointment-status';
import {Client} from './client';
import {Location} from './location';
import {Staff} from './staff';
import {TreatmentDto} from './TreatmentDto';
import {Room} from './room';

// tslint:disable-next-line:no-empty-interface
export interface AppointmentDTO {
  appointmentStatus?: AppointmentStatus;
  client?: Client;
  createdDate?: any;
  date?: any;
  endTime?: string;
  id?: number;
  room?: Room;
  notes?: string;
  price?: number;
  startTime?: string;
  staff?: Staff;
  color?: string;
  treatment?: TreatmentDto;
}
