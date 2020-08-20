import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as GenresActions from './genres.actions';
import { GenreEntity } from '../../models';

export const GENRES_FEATURE_KEY = 'genres';

export interface State extends EntityState<GenreEntity> {
  selectedId?: string | number; // which Genres record has been selected
  loaded: boolean; // has the Genres list been loaded
  error?: Error; // last known error (if any)
}

export interface GenresPartialState {
  readonly [GENRES_FEATURE_KEY]: State;
}

export const genresAdapter: EntityAdapter<GenreEntity> = createEntityAdapter<GenreEntity>();

export const initialState: State = genresAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const genresReducer = createReducer(
  initialState,
  on(GenresActions.loadGenres, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(GenresActions.loadGenresSuccess, (state, { genres }) =>
    genresAdapter.setAll(genres, { ...state, loaded: true })
  ),
  on(GenresActions.loadGenresFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return genresReducer(state, action);
}
