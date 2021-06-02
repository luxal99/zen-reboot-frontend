import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Pages, TokenConst} from '../const/const';
import {JwtUtil} from '../util/jwt-util';
import {TokenBody} from '../models/token-body';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  static async getAuthUser(): Promise<TokenBody> {
    // @ts-ignore
    return JwtUtil.decode(sessionStorage.getItem(TokenConst.NAME) as string);
  }


  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = await JwtUtil.decode(sessionStorage.getItem(TokenConst.NAME) as string);
    console.log(user);
    if (!user) {
      await this.router.navigate([Pages.LOGIN_PAGE_ROUTE], {queryParams: {returnUrl: state.url}});
      return false;
    }
    // @ts-ignore
    if (moment(user?.exp * 1000).format('YYYY-MM-DD HH:mm') > moment(new Date()).format('YYYY-MM-DD HH:mm')) {
      return true;
    } else {
      await this.router.navigate([Pages.LOGIN_PAGE_ROUTE], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
