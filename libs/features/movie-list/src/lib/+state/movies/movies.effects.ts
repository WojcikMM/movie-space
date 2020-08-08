import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as MoviesActions from './movies.actions';
import { MovieDto, MoviesClientService } from '@movie-space/shared';
import { map } from 'rxjs/operators';
import { MoviesEntity } from './movies.models';
import { State } from './movies.reducer';

@Injectable()
export class MoviesEffects {

  constructor(private readonly _actions$: Actions,
              private readonly _moviesClientService: MoviesClientService) {
  }

  loadMovies$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MoviesActions.loadMovies),
      fetch({
        run: (action) => {
          return this._moviesClientService.getMovieByType(action.movieType)
            .pipe(
              map(movies => this._mapMoviesDtoToEntity(movies)),
              map(movies => MoviesActions.loadMoviesSuccess({ movies }))
            );
          // Your custom service 'load' logic goes here. For now just return a success action...
        },

        onError: (action, error) => {
          return MoviesActions.loadMoviesFailure({ error });
        }
      })
    )
  );

  loadNextPage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MoviesActions.loadNextPage),
      fetch({
        run: (action, state: State) => {
          return this._moviesClientService.getMovieByType(state.selectedMovieType, state.currentPage + 1 )
            .pipe(
              map(movies => this._mapMoviesDtoToEntity(movies)),
              map(movies => MoviesActions.loadNextPageSuccess({ movies }))
            );
        },
        onError(action, error: any): any {
          return MoviesActions.loadNextPageFailure({ error });
        }
      })
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
