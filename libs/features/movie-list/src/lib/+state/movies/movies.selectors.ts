import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MOVIES_FEATURE_KEY,
  State,
  MoviesPartialState,
  moviesAdapter,
} from './movies.reducer';

// Lookup the 'Movies' feature state managed by NgRx
export const getMoviesState = createFeatureSelector<MoviesPartialState, State>(MOVIES_FEATURE_KEY);

const { selectAll } = moviesAdapter.getSelectors();

export const getLoadingState = createSelector(getMoviesState,  (state: State) => state.loading);

export const getMoviesError = createSelector(getMoviesState,(state: State) => state.error);

export const getCurrentPageNumber = createSelector(getMoviesState, (state: State) => state.currentPage);

export const getAllMovies = createSelector(getMoviesState, (state: State) =>  selectAll(state));

export const getSelectedMovieType = createSelector(getMoviesState, (state: State) => state.selectedMovieType);
