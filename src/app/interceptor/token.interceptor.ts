import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenConst} from '../const/const';


export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const secureToken = sessionStorage.getItem(TokenConst.NAME);
    const modifiedReq = req.clone({
      headers: req.headers.set(TokenConst.NAME, `${secureToken}`),
    });
    return next.handle(modifiedReq);
  }

}
