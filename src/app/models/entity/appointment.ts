import {Staff} from './staff';
import {AppointmentStatus} from './appointment-status';
import {Client} from './client';
import {Location} from './location';
import {TreatmentDuration} from './treatment-duration';
import {Treatment} from './treatment';
import {Room} from './room';
import {PaymentMethod} from './payment-method';

export interface Appointment {
  endTime?: string;
  startTime?: string;
  appointmentStatus?: AppointmentStatus;
  clients?: Client[];
  createdDate?: string;
  date?: any;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  room?: Room;
  notes?: string;
  staff?: Staff;
  paymentMethod?: PaymentMethod;
  treatmentDuration?: TreatmentDuration;
  price?: number;
}

