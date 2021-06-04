import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RestRoutesConst} from '../const/const';
import {Package} from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) {
  }

  getAnalyticPeriods(): Observable<string[]> {
    return this.http.get<string[]>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + '/periods', {responseType: 'json'});
  }

  getExpiredPackages(period: string): Observable<Package[]> {
    return this.http.get<Package[]>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + '/expired?=' + period, {responseType: 'json'});
  }
}
