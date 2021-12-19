import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadService } from './seguridad.service';

@Injectable()
export class SeguridadInterceptor implements HttpInterceptor {
  constructor(private seguridadService: SeguridadService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenSecurity = this.seguridadService.getToken();
    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + tokenSecurity),
    });

    return next.handle(request);
  }
}
