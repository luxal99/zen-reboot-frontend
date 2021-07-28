import {PackageBase} from '../util/package-base';

export interface Package extends PackageBase {
  availablePrice?: number;
  availableUsages?: number;
  code?: string;
  endDate?: string;
  expired?: string;
  price?: string;
  treatmentPrice: number;
  treatmentName?: string;
}
