import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {User} from '../models/user';
import {RestRoutesConst} from '../const/const';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {
  route = RestRoutesConst.USER;

  getAuthUser(): Observable<User> {
    return this.http.get<User>(RestRoutesConst.API + this.route + '/logged-in', {responseType: 'json'});
  }
}
