import {Staff} from './staff';
import {Location} from './location';

export interface Shift {
  id?: number;
  date?: any;
  startTime?: any;
  endTime?: any;
  staff?: Staff;
  location?: Location;
}
