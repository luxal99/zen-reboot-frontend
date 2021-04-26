import {AppointmentDTO} from './AppointmentDTO';
import {Location} from './location';

export interface RoomDto {
  appointments?: AppointmentDTO[];
  id?: number;
  location?: Location;
  name?: string;
}
