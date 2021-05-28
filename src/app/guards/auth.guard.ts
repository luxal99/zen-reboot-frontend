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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem(TokenConst.NAME);
    if (token && JwtUtil.decode(token)) {
      return true;
    } else {
      this.router.navigate([Pages.LOGIN_PAGE_ROUTE], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
