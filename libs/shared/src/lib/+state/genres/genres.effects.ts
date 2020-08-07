import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as GenresActions from './genres.actions';

@Injectable()
export class GenresEffects {
  loadGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenresActions.loadGenres),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return GenresActions.loadGenresSuccess({ genres: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return GenresActions.loadGenresFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
