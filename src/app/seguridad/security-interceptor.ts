import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  constructor(private securityService: SecurityService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenSecurity = this.securityService.getToken();
    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + tokenSecurity),
    });

    return next.handle(request);
  }
}
