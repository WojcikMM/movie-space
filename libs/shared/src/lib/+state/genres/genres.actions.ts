import { createAction, props } from '@ngrx/store';
import { GenreEntity } from '../../models';

export const loadGenres = createAction('[Genres API] Load Genres');

export const loadGenresSuccess = createAction('[Genres API] Load Genres Success',  props<{ genres: GenreEntity[] }>());

export const loadGenresFailure = createAction('[Genres API] Load Genres Failure',  props<{ error: Error }>());
