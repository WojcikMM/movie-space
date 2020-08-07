import { createAction, props } from '@ngrx/store';
import { MoviesEntity } from './movies.models';
import { MovieType } from '@movie-space/shared';

export const loadMovies = createAction('[Movies API] Load Movies', props<{ movieType: MovieType }>());

export const loadMoviesSuccess = createAction('[Movies API] Load Movies Success', props<{ movies: MoviesEntity[] }>());

export const loadMoviesFailure = createAction('[Movies API] Load Movies Failure', props<{ error: any }>());
