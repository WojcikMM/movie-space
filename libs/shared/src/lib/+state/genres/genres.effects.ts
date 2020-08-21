import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as GenresActions from './genres.actions';
import { GenresClientService } from '../../services/clients/genres';
import { map, shareReplay } from 'rxjs/operators';
import { GenreEntity } from '../../models';

@Injectable()
export class GenresEffects {

  constructor(private readonly actions$: Actions,
              private readonly _genreClientService: GenresClientService) {

  }

  loadGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenresActions.loadGenres),
      fetch({
        run: () => {
          return this._genreClientService.getGenresList()
            .pipe(
              shareReplay(1),
              map(genreListDto =>
                genreListDto.genres.map(({ id, name }) =>
                  ({ id, name } as GenreEntity))),
              map(genres => GenresActions.loadGenresSuccess({ genres }))
            );
        },

        onError: (_, error) => {
          return GenresActions.loadGenresFailure({ error });
        }
      })
    )
  );
}
