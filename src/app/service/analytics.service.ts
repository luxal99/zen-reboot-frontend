import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RestRoutesConst} from '../const/const';
import {Package} from '../models/package';
import {Appointment} from '../models/appointment';
import {EarnedDto} from '../models/earned-dto';
import {InvoiceItemAnalyticsDto} from '../models/voucher-package-analytics-dto';

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
    return this.http.get<Package[]>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + '/packages' + '/expired?period=' + period,
      {responseType: 'json'});
  }

  getCanceledAppointments(period: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + '/'
      + RestRoutesConst.APPOINTMENT + '/canceled?period=' + period, {responseType: 'json'});
  }

  getCompletedAppointments(period: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(RestRoutesConst.API + '/' + RestRoutesConst.ANALYTICS + '/' +
      RestRoutesConst.APPOINTMENT + '/completed?period=' + period, {responseType: 'json'});
  }

  getAllStaffEarned(period: string): Observable<EarnedDto[]> {
    return this.http.get<EarnedDto[]>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + '/'
      + RestRoutesConst.STAFF + '/earned?period=' + period, {responseType: 'json'});
  }

  getVouchersAnalytics(period: string): Observable<InvoiceItemAnalyticsDto> {
    return this.http.get<InvoiceItemAnalyticsDto>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + '/'
      + RestRoutesConst.VOUCHER + `?period=${period}`, {responseType: 'json'});
  }

  getPackagesAnalytics(period: string): Observable<InvoiceItemAnalyticsDto> {
    return this.http.get<InvoiceItemAnalyticsDto>(RestRoutesConst.API + RestRoutesConst.ANALYTICS +
      '/' + RestRoutesConst.PACKAGE + `?period=${period}`, {responseType: 'json'});
  }

  getTopClients(): Observable<any[]> {
    return this.http.get<any[]>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + '/' + RestRoutesConst.CLIENT + '/top', {responseType: 'json'});
  }

  getReturningClients(): Observable<any[]> {
    return this.http.get<any[]>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + '/' +
      RestRoutesConst.CLIENT + '/returning', {responseType: 'json'});
  }
}
