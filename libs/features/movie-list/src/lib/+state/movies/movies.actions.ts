import { createAction, props } from '@ngrx/store';
import { MovieEntity } from '../../models';
import { MovieType } from '@movie-space/shared';

export const loadMovies = createAction('[Movies API] Load Movies', props<{ movieType: MovieType }>());
export const loadMoviesSuccess = createAction('[Movies API] Load Movies Success', props<{ movies: MovieEntity[] }>());
export const loadMoviesFailure = createAction('[Movies API] Load Movies Failure', props<{ error: Error }>());

export const loadNextPage = createAction('[Movies API] Load Next Movies Page');
export const loadNextPageSuccess = createAction('[Movies API] Load Next Movies Page Success', props<{ movies: MovieEntity[] }>());
export const loadNextPageFailure = createAction('[Movies API] Load Next Movies Page Failure', props<{ error: Error }>());
