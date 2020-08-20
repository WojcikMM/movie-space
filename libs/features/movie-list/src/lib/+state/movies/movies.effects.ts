import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  createEffect,
  Actions,
  ofType
} from '@ngrx/effects';

import { fetch } from '@nrwl/angular';
import {
  map,
  withLatestFrom
} from 'rxjs/operators';

import {
  MovieDto,
  MoviesClientService
} from '@movie-space/shared';

import { MoviesEntity } from '../../models';
import * as MoviesActions from './movies.actions';
import * as MoviesSelectors from './movies.selectors';

@Injectable()
export class MoviesEffects {

  constructor(private readonly _actions$: Actions,
              private readonly _store$: Store,
              private readonly _moviesClientService: MoviesClientService) {
  }

  loadMovies$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MoviesActions.loadMovies),
      fetch({
        run: action => this._moviesClientService.getMovieByType(action.movieType)
          .pipe(
            map(movies => this._mapMoviesDtoToEntity(movies)),
            map(movies => MoviesActions.loadMoviesSuccess({ movies }))
          ),
        onError: (action, error: any) => {
          return MoviesActions.loadMoviesFailure({ error: error });
        }
      })
    )
  );

  loadNextPage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MoviesActions.loadNextPage),
      withLatestFrom(this._store$.select(MoviesSelectors.getMoviesState)),
      fetch({
          run: (action, state) =>
            this._moviesClientService.getMovieByType(state.selectedMovieType, state.currentPage + 1)
              .pipe(
                map(movies => this._mapMoviesDtoToEntity(movies)),
                map(movies => MoviesActions.loadNextPageSuccess({ movies }))
              ),
          onError(action, error) {
            return MoviesActions.loadNextPageFailure({ error });
          }
        }
      )
    ));

  private _mapMoviesDtoToEntity(movies: MovieDto[]): MoviesEntity[] {
    return movies.map((movie: MovieDto) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      genresIds: movie.genre_ids,
      votesAverage: movie.vote_average,
      votesCount: movie.vote_count,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      score: movie.vote_average * 10
    } as MoviesEntity));
  }
}
