import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GENRES_FEATURE_KEY,
  State,
  GenresPartialState,
  genresAdapter,
} from './genres.reducer';

// Lookup the 'Genres' feature state managed by NgRx
export const getGenresState = createFeatureSelector<GenresPartialState, State>(
  GENRES_FEATURE_KEY
);

const { selectAll } = genresAdapter.getSelectors();

export const getAllGenres = createSelector(getGenresState,
  (state: State) => selectAll(state)
);
