import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as MoviesActions from './movies.actions';
import { MoviesClientService } from '@movie-space/shared';
import { map } from 'rxjs/operators';
import { MoviesEntity } from '@movie-space/features/movie-list';

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
              map(movies => movies.map(movie => ({
                  id: movie.id,
                  title: movie.title,
                  overview: movie.overview,
                  genresIds: movie.genre_ids,
                  votesAverage: movie.vote_average,
                  votesCount: movie.vote_count,
                  posterPath: movie.poster_path,
                  releaseDate: movie.release_date,
                  score: movie.vote_average * 10
                } as MoviesEntity)
              )),
              map(movies => MoviesActions.loadMoviesSuccess({ movies }))
            );
          // Your custom service 'load' logic goes here. For now just return a success action...
        },

        onError: (action, error) => {
          console.error('Error', error);
          return MoviesActions.loadMoviesFailure({ error });
        }
      })
    )
  );


}
