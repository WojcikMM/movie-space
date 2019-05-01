import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { MovieApiResult } from '../models/movie-api-result';
import { Observable } from 'rxjs';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class MovieDiscoverService {

  constructor(private _httpClient: HttpClient) { }

  getReleases(genreId?: number): Observable<MovieApiResult> {
    const requestPage = '1'; // future pageing

    let params = new HttpParams()
      .set('primary_release_date.gte', this.addMonths(-1))
      .set('primary_release_date.lte', this.addMonths(1))
      .set('page', requestPage);
    if (!isNaN(genreId)) {
      params = params.set('with_genres', genreId.toString());
    }
    return this._httpClient.get<MovieApiResult>(`${environment.movieDbUrl}/discover/movie`, { params: params });
  }

  addMonths = (monthsLength: number) =>  moment().add(monthsLength, 'months').format('YYYY-MM-DD');

}
