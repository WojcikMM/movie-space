import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { MovieType } from '../../models/movie-type.enum';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MovieClientService {

  private readonly _httpPrefix = `${environment.movieDbUrl}/movie`;

  constructor(private readonly _httpClient: HttpClient) {
  }

  public  getMovieByType(movieType: MovieType, page?: number): Observable<Movie[]> {
    switch (movieType) {
      case MovieType.NOW_PLAYING:
        return this._getMovies('now_playing', page);
      case MovieType.POPULAR:
        return this._getMovies('popular', page);
      case MovieType.TOP_RATED:
        return this._getMovies('top_rated', page);
      case MovieType.UPCOMING:
        return this._getMovies('upcoming', page);
      default:
        throw new Error('Unsupported movie type.');
    }
  }

  private _getMovies(urlSuffix: string, page?: number): Observable<Movie[]> {
    return this._httpClient.get<unknown>(`${this._httpPrefix}/${urlSuffix}`, {
      params: {
        page: page?.toString()
      }
    }).pipe(
      map((response: any) => response.results)
    );
  }
}
