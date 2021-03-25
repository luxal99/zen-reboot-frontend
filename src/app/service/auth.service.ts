import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {RestServices} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  auth(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(RestServices.AUTH, user, {observe: 'response', responseType: 'json'});
  }
}
