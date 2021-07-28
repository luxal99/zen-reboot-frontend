import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RestRoutesConst} from '../const/const';
import {Package} from '../models/entity/package';
import {Appointment} from '../models/entity/appointment';
import {StaffEarnedDto} from '../models/dto/staff-earned-dto';
import {InvoiceItemAnalyticsDto} from '../models/dto/voucher-package-analytics-dto';
import {TopClientsDto} from '../models/dto/top-clients-dto';
import {Client} from '../models/entity/client';
import {ProfitDto} from '../models/dto/profit-dto';
import {ExpensesAnalyticsDto} from '../models/dto/expenses-analytics-dto';
import {Voucher} from "../models/entity/voucher";

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

  getAllStaffEarned(period: string): Observable<StaffEarnedDto[]> {
    return this.http.get<StaffEarnedDto[]>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + '/'
      + 'staff' + '/earned?period=' + period, {responseType: 'json'});
  }

  getVouchersAnalytics(period: string): Observable<InvoiceItemAnalyticsDto> {
    return this.http.get<InvoiceItemAnalyticsDto>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + '/'
      + RestRoutesConst.VOUCHER + `?period=${period}`, {responseType: 'json'});
  }

  getPackagesAnalytics(period: string): Observable<InvoiceItemAnalyticsDto> {
    return this.http.get<InvoiceItemAnalyticsDto>(RestRoutesConst.API + RestRoutesConst.ANALYTICS +
      '/' + RestRoutesConst.PACKAGE + `?period=${period}`, {responseType: 'json'});
  }

  getTopClients(period: string): Observable<TopClientsDto> {
    return this.http.get<TopClientsDto>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + '/'
      + RestRoutesConst.CLIENT + `/top?period=${period}`, {responseType: 'json'});
  }

  getReturningClients(period: string): Observable<Client[]> {
    return this.http.get<Client[]>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + '/' +
      RestRoutesConst.CLIENT + `/returning?period=${period}`, {responseType: 'json'});
  }

  getAppointmentsAnalytics(period: string): Observable<InvoiceItemAnalyticsDto> {
    return this.http.get<InvoiceItemAnalyticsDto>(RestRoutesConst.API + RestRoutesConst.ANALYTICS
      + '/' + RestRoutesConst.APPOINTMENT + `?period=${period}`, {responseType: 'json'});
  }

  getAnalyticsProfit(period: string): Observable<ProfitDto> {
    return this.http.get(RestRoutesConst.API + '/' + RestRoutesConst.ANALYTICS + `/profit?period=${period}`, {responseType: 'json'});
  }

  getAnalyticsExpenses(period: string): Observable<ExpensesAnalyticsDto> {
    return this.http.get<ExpensesAnalyticsDto>(RestRoutesConst.API + '/' + RestRoutesConst.ANALYTICS + '/' +
      RestRoutesConst.EXPENSE + `?period=${period}`, {responseType: 'json'});
  }

  getExpiredVouchersAnalytics(period: string): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(RestRoutesConst.API +
      RestRoutesConst.ANALYTICS + '/' + RestRoutesConst.VOUCHER + '/expired' +
      `?period=${period}`, {responseType: 'json'});
  }
}
