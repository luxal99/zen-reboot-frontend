import {Person} from './person';

export interface Staff {
  createdDate?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  person?: Person;
  color?: string;
  startDate?: string;
  endDate?: string
}

