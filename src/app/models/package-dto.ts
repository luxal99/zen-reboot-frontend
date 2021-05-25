import {Client} from './client';
import {TreatmentDuration} from './treatment-duration';

export interface PackageDto {
  client?: Client;
  count?: number;
  discount?: number;
  startDate: string;
  treatmentDuration?: TreatmentDuration;
}
