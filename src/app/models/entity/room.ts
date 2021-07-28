import {Location} from './location';

export interface Room {
  id?: number;
  name?: string;
  beds?: number;
  location?: Location;
}
