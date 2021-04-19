import {Staff} from './staff';
import {AppointmentStatus} from './appointment-status';
import {Client} from './client';
import {Location} from './location';
import {TreatmentDuration} from './treatment-duration';
import {Treatment} from './treatment';

export interface Appointment {
  endTime?: string;
  startTime?: string;
  appointmentStatus?: AppointmentStatus;
  client?: Client;
  createdDate?: string;
  date?: any;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  location?: Location;
  notes?: string;
  staff?: Staff;
  treatmentDuration?: TreatmentDuration;
  price?: number;
}

