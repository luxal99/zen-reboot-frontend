import {Person} from '../entity/person';


export interface Contact {
  createdDate?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  person?: Person;
  type?: string;
  value?: string;
  prefix?: string;
}

