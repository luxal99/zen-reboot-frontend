import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class PeriodsService {

  listOfPeriods: any;

  constructor(private http: HttpClient) {
  }

  async getPeriods(): Promise<void> {
    this.listOfPeriods = await this.http.get(RestRoutesConst.API + '/' + RestRoutesConst.ANALYTICS + '/' + 'periods').toPromise();
  }
}
