import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  route = '';

  constructor(protected http: HttpClient) {
  }

  save(entity: T, token?: string): Observable<T> {
    return this.http.post<T>(`${RestRoutesConst.API}${this.route}`, entity, {
      responseType: 'json',
      headers: {Authorization: ''}
    });
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${RestRoutesConst.API}${this.route}/` + id, {
      responseType: 'json'
    });
  }

  getAll(query?: string): Observable<T[]> {
    if (query) {
      return this.http.get<T[]>(`${RestRoutesConst.API}${this.route}?q=` + query, {
        responseType: 'json',
        headers: {Authorization: ''}
      });
    } else {
      return this.http.get<T[]>(`${RestRoutesConst.API}${this.route}`, {
        responseType: 'json',
        headers: {Authorization: ''}
      });
    }
  }

  update(entity: T, token?: string): Observable<any> {
    return this.http.put(`${RestRoutesConst.API}${this.route}`, entity, {
      responseType: 'text',
      headers: {Authorization: ''}
    });
  }


  delete(id: number, token?: string): Observable<any> {
    return this.http.delete(`${RestRoutesConst.API}${this.route}/${id}`, {
      responseType: 'text',
      headers: {Authorization: ''}
    });
  }

  getAllSearchByQueryParam(urlEncoded: string): Observable<T[]> {
    return this.http.get<T[]>(RestRoutesConst.API + this.route + '?q=' + urlEncoded, {responseType: 'json'});
  }

}
