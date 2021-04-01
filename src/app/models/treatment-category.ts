import {Treatment} from './treatment';

export interface TreatmentCategory {
  id?: number;
  createdDate?: any;
  name?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: any;
  treatments?: Treatment[];
}
