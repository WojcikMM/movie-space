import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromMovies from './movies.reducer';
import * as MoviesSelectors from './movies.selectors';
import * as fromActions from './movies.actions';
import { MovieType } from '@movie-space/shared';

@Injectable()
export class MoviesFacade {
  areMoviesLoading$ = this.store.pipe(select(MoviesSelectors.getLoadingState));
  allMovies$ = this.store.pipe(select(MoviesSelectors.getAllMovies));
  selectedMovieType$ = this.store.pipe(select(MoviesSelectors.getSelectedMovieType));

  constructor(private readonly store: Store<fromMovies.MoviesPartialState>) {
  }

  setMovieType(movieType: MovieType = MovieType.NOW_PLAYING) {
    this.store.dispatch(fromActions.loadMovies({ movieType: movieType }));
  }

  loadNextPage() {
    this.store.dispatch(fromActions.loadNextPage());
  }
}
