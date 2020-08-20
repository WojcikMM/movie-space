import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as MoviesActions from './movies.actions';
import { MoviesEntity } from '../../models';
import { MovieType } from '@movie-space/shared';

export const MOVIES_FEATURE_KEY = 'movies';

export interface State extends EntityState<MoviesEntity> {
  selectedMovieType: MovieType;
  loading: boolean; // has the Movies list been loaded
  error: string | null; // last known error (if any)
  currentPage?: number;
}

export interface MoviesPartialState {
  readonly [MOVIES_FEATURE_KEY]: State;
}

export const moviesAdapter: EntityAdapter<MoviesEntity> = createEntityAdapter<MoviesEntity>();

export const initialState: State = moviesAdapter.getInitialState({
  // set initial required properties
  loading: false,
  currentPage: null,
  error: null,
  selectedMovieType: MovieType.NOW_PLAYING
});

const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.loadMovies,
    (state, {movieType}) => moviesAdapter.removeAll({
      ...state,
      selectedMovieType: movieType,
      loading: true,
      error: null
    })
  ),
  on(MoviesActions.loadNextPage, (state) => ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(MoviesActions.loadMoviesSuccess, (state, { movies }) =>
    moviesAdapter.setAll(movies, {
      ...state,
      currentPage: 1,
      loading: false
    })
  ),
  on(MoviesActions.loadNextPageSuccess, ((state, action) =>
        moviesAdapter.addMany(action.movies, {
          ...state,
          currentPage: state.currentPage + 1,
          loading: false
        })
    )
  ),
  on(MoviesActions.loadMoviesFailure,
    MoviesActions.loadNextPageFailure,
    (state, { error}) => ({
      ...state,
      loading: false,
      error:  error?.message || 'Unknown error'
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return moviesReducer(state, action);
}
