import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './localstorage.service';
import { Router } from '@angular/router';
import { CommonConstants } from '../common-constants/common-constants';


@Injectable()
export class RequestHeadersInterceptor implements HttpInterceptor {

  constructor(private _localStorage: LocalStorageService,
    private _router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this._router.url.includes("/twofectorauth") && request.url.includes("/connect/token")) {
      return next.handle(request);
    }

    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
  }
}
