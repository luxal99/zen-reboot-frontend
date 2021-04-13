import {Staff} from './staff';

export interface Shift {
  id?: number;
  date?: any;
  startTime?: any;
  endTime?: any;
  staff?: Staff;
  location?: Location;
}
