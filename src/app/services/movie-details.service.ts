import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MovieDetailsResult } from '../models/movie-details/MovieDetailsResult';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  constructor(private _httpClient: HttpClient) { }

getMovieDetails(movie_id: number): Observable<MovieDetailsResult> {

  const params = new HttpParams()
  .set('api_key', environment.movieDbKey);
return  this._httpClient.get<MovieDetailsResult>('https://api.themoviedb.org/3/movie/' + movie_id, {params: params});

}


}
