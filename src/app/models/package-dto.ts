import {TreatmentDuration} from './treatment-duration';
import {PackageBase} from './package-base';

export interface PackageDto extends PackageBase {
  treatmentDuration: TreatmentDuration;
}
