import {AppointmentStatus} from '../entity/appointment-status';
import {Client} from '../entity/client';
import {Location} from '../entity/location';
import {Staff} from '../entity/staff';
import {TreatmentDto} from './TreatmentDto';
import {Room} from '../entity/room';
import {PaymentMethod} from '../entity/payment-method';

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
