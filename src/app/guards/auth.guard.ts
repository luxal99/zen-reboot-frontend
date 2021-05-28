import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Pages, TokenConst} from '../const/const';
import {JwtUtil} from '../util/jwt-util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  protected setAuthUser(user: any): void {
    sessionStorage.setItem('loggedUser', user as string);
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
