import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RestRoutesConst} from "../const/const";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PeriodsService {

  listOfPeriods: any;

  constructor(private http: HttpClient) {
    this.getPeriods().then(() => {
    });
  }

  async getPeriods(): Promise<void> {
    this.listOfPeriods = await this.http.get(RestRoutesConst.API + "/" + RestRoutesConst.ANALYTICS + "/" + "periods").toPromise();
  }

  getPeriodsAsObs(): Observable<string[]> {
    return this.http.get<string[]>(RestRoutesConst.API + RestRoutesConst.ANALYTICS + "/periods", {responseType: "json"});
  }
}
