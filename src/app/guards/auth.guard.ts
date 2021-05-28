import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LOGGED_USER, Pages, TokenConst} from '../const/const';
import {JwtUtil} from '../util/jwt-util';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  static getAuthUser(): User {
    return JSON.parse(sessionStorage.getItem(LOGGED_USER) as string);
  }

  protected setAuthUser(user: any): void {
    sessionStorage.setItem(LOGGED_USER, JSON.stringify(user));
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = await JwtUtil.decode(sessionStorage.getItem(TokenConst.NAME) as string);
    if (user) {
      this.setAuthUser(user);
      return true;
    } else {
      await this.router.navigate([Pages.LOGIN_PAGE_ROUTE], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
