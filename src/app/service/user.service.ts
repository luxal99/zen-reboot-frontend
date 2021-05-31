import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {User} from '../models/user';
import {RestRoutesConst, Roles} from '../const/const';
import {Observable} from 'rxjs';
import {CreateUserDto} from '../models/create-user-dto';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {
  route = RestRoutesConst.USER;

  createUser(userDto: CreateUserDto): Observable<User> {
    return this.http.post<User>(RestRoutesConst.API + this.route, userDto, {responseType: 'json'});
  }

  getAuthUser(): Observable<User> {
    return this.http.get<User>(RestRoutesConst.API + this.route + '/logged-in', {responseType: 'json'});
  }

  getUserRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(RestRoutesConst.API + this.route + '/' + RestRoutesConst.ROLE, {responseType: 'json'});
  }
}
