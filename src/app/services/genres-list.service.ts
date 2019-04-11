import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GenreList } from '../models/genre-list';

@Injectable({
  providedIn: 'root'
})
export class GenresListService {

  constructor(private _httpClient: HttpClient) { }

  getGenresList(): Observable<GenreList> {
    const apiUrl = environment.movieDbUrl + '/genre/movie/list';
    const params = new HttpParams()
      .set('api_key', environment.movieDbKey);
    return this._httpClient.get<GenreList>(apiUrl, { params: params });
  }

}
