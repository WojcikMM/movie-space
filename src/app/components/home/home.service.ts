import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie';
import { Observable } from 'rxjs';
import { MovieClientService } from '../../clients/movies/movie-client.service';
import { MovieType } from '../../models/movie-type.enum';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _movieType = MovieType.NOW_PLAYING;
  private _currentPage = 1;

  constructor(private readonly _movieClientService: MovieClientService) {
  }

  public get movieType(): MovieType {
    return this._movieType;
  }

  public set movieType(value: MovieType) {
    this._movieType = value;
    this._currentPage = 1;
  }

  public getMovies(): Observable<Movie[]> {
    return this._movieClientService.getMovieByType(this._movieType, this._currentPage);
  }
}
