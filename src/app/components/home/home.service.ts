import { Injectable } from '@angular/core';
import {
  Observable,
  combineLatest,
  BehaviorSubject
} from 'rxjs';
import {
  map,
  mergeMap
} from 'rxjs/operators';
import {
  MovieDto,
  MovieType,
  MoviesClientService
} from '../../modules/shared';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly _movieType$: BehaviorSubject<MovieType> = new BehaviorSubject<MovieType>(MovieType.NOW_PLAYING);
  private readonly _currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private _lastResults: MovieDto[] = [];

  constructor(private readonly _movieClientService: MoviesClientService) {
  }

  public get movieType(): MovieType {
    return this._movieType$.value;
  }

  public set movieType(value: MovieType) {
    this._movieType$.next(value);
    this._currentPage$.next(1);
  }

  public nextPage() {
    this._currentPage$.next(this._currentPage$.value + 1);
  }

  public getMovies$(): Observable<MovieDto[]> {
    // TODO: Add fetching genres (once) and map it to movies in "map" pipe operator
    return combineLatest([this._movieType$, this._currentPage$]).pipe(
      mergeMap(([movieType, currentPage]: [MovieType, number]) =>
        this._movieClientService.getMovieByType(movieType, currentPage)
          .pipe(
            map(result => {
                const currentResults = currentPage === 1 ? result : [...this._lastResults, ...result];
                this._lastResults = currentResults;
                return currentResults;
              }
            )
          )
      )
    );
  }
}
