import { Injectable } from '@angular/core';
import {environment } from '../../environments/environment';

import {HttpClient, HttpParams} from '@angular/common/http';
import {MovieApiResult} from '../models/movie-api-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDiscoverService {

  constructor(private _httpClient: HttpClient) {}

  getReleases(page = 1): Observable<MovieApiResult> {
    const params = new HttpParams()
          .set('api_key', environment.movieDbKey)
          .set('primary_release_date.gte', this.addMonths(-1).toLocaleString())
          .set('primary_release_date.lte', this.addMonths(1).toLocaleString())
          .set('page', page.toString());
   return this._httpClient.get<MovieApiResult>(`${environment.movieDbUrl}/discover/movie`, { params: params});
  }

  private addMonths(monthsLength: number): string {
    const transformedDate = new Date();
    const pattern = /\./gi;
    transformedDate.setMonth( transformedDate.getMonth() + monthsLength);
    return `${transformedDate.getFullYear()}-${transformedDate.getMonth()}-${transformedDate.getDay()}`;
  }
}
