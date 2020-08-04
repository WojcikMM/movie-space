import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDto } from './movie.dto';
import { MovieType } from './movie-type.enum';
import { map } from 'rxjs/operators';
import { MovieApiResultDto } from './movie-api-result.dto';
import { MovieDetailsDto } from './movie-details.dto';
import { environment } from '../../../../../../../apps/webapp/src/environments/environment';


@Injectable()
export class MoviesClientService {

  constructor(private readonly _httpClient: HttpClient) {
  }

  public searchMovie(query: string, page?: number): Observable<MovieDto[]> {
    return this._httpClient.get<MovieApiResultDto>(`${environment.movieDbUrl}/search/movie`, {
      params: {
        query,
        page: page?.toString()
      }
    }).pipe(
      map((response: MovieApiResultDto) => response.results)
    );
  }

  public getMovieByType(movieType: MovieType, page?: number): Observable<MovieDto[]> {
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

  public getMovieById(movieId: number): Observable<MovieDetailsDto> {
    return this._httpClient.get<MovieDetailsDto>(`${environment.movieDbUrl}/movie/${movieId}`, {
      params: {
        append_to_response: 'credits'
      }
    });
  }

  private _getMovies(urlSuffix: string, page?: number): Observable<MovieDto[]> {
    return this._httpClient.get<MovieApiResultDto>(`${environment.movieDbUrl}/movie/${urlSuffix}`, {
      params: {
        page: page?.toString()
      }
    }).pipe(
      map((response: MovieApiResultDto) => response.results)
    );
  }
}
