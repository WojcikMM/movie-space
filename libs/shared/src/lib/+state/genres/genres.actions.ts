import { createAction, props } from '@ngrx/store';
import { GenresEntity } from './genres.models';

export const loadGenres = createAction('[Genres] Load Genres');

export const loadGenresSuccess = createAction('[Genres] Load Genres Success',  props<{ genres: GenresEntity[] }>());

export const loadGenresFailure = createAction('[Genres] Load Genres Failure',  props<{ error: any }>());
