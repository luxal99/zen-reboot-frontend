import {Role} from './role';

export interface TokenBody {
  exp?: number;
  iat?: number;
  roles?: Role[];
  sub?: string;
}
