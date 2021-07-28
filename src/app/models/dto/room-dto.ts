import {AppointmentDTO} from './AppointmentDTO';
import {Location} from '../entity/location';

export interface RoomDto {
  appointments?: AppointmentDTO[];
  id?: number;
  location?: Location;
  name?: string;
  beds?: number
}
