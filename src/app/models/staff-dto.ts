import {Location} from './location';
import {Staff} from './staff';
import {RepeatTypeEnum} from '../enums/RepeatTypeEnum';
import {Person} from './person';
import {Shift} from './shift';

export interface StaffDto {
  date?: any;
  endTime?: any;
  location?: Location;
  repeatCount?: number;
  repeatType?: RepeatTypeEnum;
  person?: Person;
  startTime?: any;
  shifts: Shift[];
  color?: string;

}
