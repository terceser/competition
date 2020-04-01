import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(_inj: Injector) {}

  // tslint:disable-next-line:no-any
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = this.getAuthorizationHeader();
    if (authHeader) {
      const authReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });

      return next.handle(authReq);
    }

    return next.handle(req);
  }

  private getAuthorizationHeader(): string {
    if (localStorage.getItem('token')) {
      return `JWT ${localStorage.getItem('token')}`;
    }

    return null;
  }
}
