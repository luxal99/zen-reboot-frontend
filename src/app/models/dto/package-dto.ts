import {TreatmentDuration} from '../entity/treatment-duration';
import {PackageBase} from '../util/package-base';

export interface PackageDto extends PackageBase {
  treatmentDuration: TreatmentDuration;
}
