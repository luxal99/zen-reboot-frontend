import {Address} from './address';
import {ReferralSource} from './referral-source';
import {Person} from './person';
import {Appointment} from './appointment';


export interface Client {
  address?: Address;
  appointments?: Appointment;
  birthday?: string;
  createdDate?: string;
  gender?: string;
  id?: number;
  language?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  marketingNotifications?: boolean;
  notes?: string;
  notificationMethod?: string;
  person?: Person;
  referralSource?: ReferralSource;
}

