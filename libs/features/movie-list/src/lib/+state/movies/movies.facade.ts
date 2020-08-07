import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromMovies from './movies.reducer';
import * as MoviesSelectors from './movies.selectors';
import { loadMovies } from './movies.actions';
import { MovieType } from '@movie-space/shared';

@Injectable()
export class MoviesFacade {
  areMoviesLoading$ = this.store.pipe(select(MoviesSelectors.getLoadingState));
  allMovies$ = this.store.pipe(select(MoviesSelectors.getAllMovies));
  selectedMovieType$ = this.store.pipe(select(MoviesSelectors.getSelectedMovieType))

  constructor(private store: Store<fromMovies.MoviesPartialState>) {}

  setMovieType(movieType: MovieType = MovieType.NOW_PLAYING){
    this.store.dispatch(loadMovies({movieType: movieType}))
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
