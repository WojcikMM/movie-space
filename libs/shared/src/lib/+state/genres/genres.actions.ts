import { createAction, props } from '@ngrx/store';
import { GenreEntity } from '../../models';

export const loadGenres = createAction('[Genres] Load Genres');

export const loadGenresSuccess = createAction('[Genres] Load Genres Success',  props<{ genres: GenreEntity[] }>());

export const loadGenresFailure = createAction('[Genres] Load Genres Failure',  props<{ error: Error }>());
