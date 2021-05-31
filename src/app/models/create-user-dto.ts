import {Role} from './role';

export interface CreateUserDto {
  color: string;
  email: string;
  firstName: string;
  lastname: string;
  roles: Role[];
  username: string;
}
