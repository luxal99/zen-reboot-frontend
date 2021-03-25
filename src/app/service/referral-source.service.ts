import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {ReferralSource} from '../models/referral-source';
import {RestRoutesConst} from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class ReferralSourceService extends GenericService<ReferralSource> {
  route = RestRoutesConst.REFERRAL_SOURCES;
}
