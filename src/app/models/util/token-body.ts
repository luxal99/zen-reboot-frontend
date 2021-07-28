import {Role} from './role';

export interface TokenBody {
  exp?: number;
  iat?: number;
  roles?: string[];
  username?: string
  sub?: string;
}
