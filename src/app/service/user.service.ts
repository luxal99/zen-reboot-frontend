import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {User} from '../models/entity/user';
import {RestRoutesConst, Roles} from '../const/const';
import {Observable} from 'rxjs';
import {CreateUserDto} from '../models/dto/create-user-dto';
import {Role} from '../models/util/role';
import {ChangePasswordDto} from '../models/dto/change-password-dto';

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

  changePassword(passwordDto: ChangePasswordDto): Observable<any> {
    return this.http.put(RestRoutesConst.API + this.route + '/password', passwordDto, {responseType: 'text'});
  }

  resetPassword(userID: any): Observable<any> {
    return this.http.delete(RestRoutesConst.API + this.route + '/' + userID + '/password');
  }
}
