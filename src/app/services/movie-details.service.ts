import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MovieDetailsResult } from '../models/movie-details/MovieDetailsResult';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

constructor(private _httpClient: HttpClient) { }

getMovieDetails(movieId: number): Observable<MovieDetailsResult> {

  const params = new HttpParams()
    .set('append_to_response', 'credits');
return  this._httpClient.get<MovieDetailsResult>(`${environment.movieDbUrl}/movie/${movieId}`, {params});

}


}
