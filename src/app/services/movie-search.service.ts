import { Injectable } from '@angular/core';
import {environment } from '../../environments/environment';
import { MovieApiResult } from '../models/movie-api-result';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  constructor(private _httpClient: HttpClient) { }

  searchForMovies(query: string, page= 1): Observable<MovieApiResult> {
    const params = new HttpParams()
    .set('api_key', environment.movieDbKey)
    .set('query', query)
    .set('page', page.toString());

    return this._httpClient.get<MovieApiResult>(`${environment.movieDbUrl}/search/movie`, { params: params});
  }
}
