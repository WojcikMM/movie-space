import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GLOBAL_CONST } from '../../global.const';

@Injectable()
export class TheMovieDbInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(GLOBAL_CONST.MOVIE_DB.URL)) {
      req = req.clone({
        setParams: {
          api_key: GLOBAL_CONST.MOVIE_DB.API_KEY
        }
      });
    }
    return next.handle(req);
  }
}
