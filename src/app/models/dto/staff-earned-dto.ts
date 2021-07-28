import {Staff} from '../entity/staff';

export interface StaffEarnedDto {
  earned?: number;
  count?: number;
  staff?: Staff;
}
