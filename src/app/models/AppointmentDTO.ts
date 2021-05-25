import {AppointmentStatus} from './appointment-status';
import {Client} from './client';
import {Location} from './location';
import {Staff} from './staff';
import {TreatmentDto} from './TreatmentDto';
import {Room} from './room';
import {PaymentMethod} from './payment-method';

// tslint:disable-next-line:no-empty-interface
export interface AppointmentDTO {
  appointmentStatus?: AppointmentStatus;
  clients?: Client[];
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
  paymentMethod?: PaymentMethod;
  treatment?: TreatmentDto;
}
