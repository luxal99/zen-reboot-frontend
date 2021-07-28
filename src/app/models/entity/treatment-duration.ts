import {Treatment} from './treatment';

export interface TreatmentDuration {
  createdDate?: string;
  duration?: number;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  price?: number;
  treatment?: Treatment;
}

