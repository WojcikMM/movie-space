import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, withLatestFrom, mergeMap, catchError } from 'rxjs/operators';

import { MovieDto, MoviesClientService } from '@movie-space/shared';

import { MoviesEntity } from './movies.models';
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
      mergeMap(action => this._moviesClientService.getMovieByType(action.movieType)
        .pipe(
          map(movies => this._mapMoviesDtoToEntity(movies)),
          map(movies => MoviesActions.loadMoviesSuccess({ movies })),
          catchError(error => of(MoviesActions.loadMoviesFailure({ error }))
          ))
      )
    )
  );

  loadNextPage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MoviesActions.loadNextPage),
      withLatestFrom(this._store$.select(MoviesSelectors.getMoviesState)),
      mergeMap(([_, state]) =>
        this._moviesClientService.getMovieByType(state.selectedMovieType, state.currentPage + 1)
          .pipe(
            map(movies => this._mapMoviesDtoToEntity(movies)),
            map(movies => MoviesActions.loadNextPageSuccess({ movies })),
            catchError((error => {
              return of(MoviesActions.loadNextPageFailure({ error }));
            }))
          )
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
