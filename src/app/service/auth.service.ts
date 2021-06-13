import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  auth(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(RestRoutesConst.API + RestRoutesConst.AUTH, user, {
      observe: 'response',
      responseType: 'json'
    });
  }
}
