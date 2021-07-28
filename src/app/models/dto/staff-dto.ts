import {Location} from '../entity/location';
import {RepeatTypeEnum} from '../../enums/RepeatTypeEnum';
import {Person} from '../entity/person';
import {Shift} from '../entity/shift';
import {AppointmentDTO} from './AppointmentDTO';

export interface StaffDto {
  appointments?: AppointmentDTO[];
  date?: any;
  endTime?: any;
  location?: Location;
  repeatCount?: number;
  repeatType?: RepeatTypeEnum;
  person?: Person;
  startTime?: any;
  shifts?: Shift[];
  color?: string;
  id?: number;

}
