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

const { selectAll, selectEntities } = genresAdapter.getSelectors();

export const getGenresLoaded = createSelector(
  getGenresState,
  (state: State) => state.loaded
);

export const getGenresError = createSelector(
  getGenresState,
  (state: State) => state.error
);

export const getAllGenres = createSelector(getGenresState, (state: State) =>
  selectAll(state)
);

export const getGenresEntities = createSelector(
  getGenresState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getGenresState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getGenresEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
