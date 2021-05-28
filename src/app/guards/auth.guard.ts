import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LOGGED_USER, Pages, TokenConst} from '../const/const';
import {JwtUtil} from '../util/jwt-util';
import {User} from '../models/user';
import {TokenBody} from '../models/token-body';

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
    if (user) {
      return true;
    } else {
      await this.router.navigate([Pages.LOGIN_PAGE_ROUTE], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
