import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as MoviesActions from './movies.actions';
import { MoviesEntity } from './movies.models';
import { MovieType } from '@movie-space/shared';

export const MOVIES_FEATURE_KEY = 'movies';

export interface State extends EntityState<MoviesEntity> {
  selectedId?: string | number; // which Movies record has been selected
  selectedMovieType: MovieType;
  loading: boolean; // has the Movies list been loaded
  error?: string | null; // last known error (if any)
  currentPage?: number;
}

export interface MoviesPartialState {
  readonly [MOVIES_FEATURE_KEY]: State;
}

export const moviesAdapter: EntityAdapter<MoviesEntity> = createEntityAdapter<MoviesEntity>();

export const initialState: State = moviesAdapter.getInitialState({
  // set initial required properties
  loading: false,
  selectedMovieType: MovieType.NOW_PLAYING
});

const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.loadMovies, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(MoviesActions.loadMoviesSuccess, (state, { movies }) =>
    moviesAdapter.setAll(movies, {
      ...state,
      loading: false
    })
  ),
  on(MoviesActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error as string
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return moviesReducer(state, action);
}
