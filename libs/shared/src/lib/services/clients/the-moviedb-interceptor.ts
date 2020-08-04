import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../apps/webapp/src/environments/environment';

@Injectable()
export class TheMovieDbInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.movieDbUrl)) {
      req = req.clone({
        setParams: {
          api_key: environment.movieDbKey
        }
      });
    }
    return next.handle(req);
  }
}
