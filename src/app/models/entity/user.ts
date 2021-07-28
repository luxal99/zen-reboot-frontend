import {Role} from '../util/role';
import {Staff} from './staff';

export interface User {
  createdDate?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  password?: string;
  roles?: Array<Role>;
  staff?: Staff;
  username?: string;
}

