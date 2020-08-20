import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromGenres from './genres.reducer';
import * as GenresSelectors from './genres.selectors';

@Injectable()
export class GenresFacade {
  loaded$ = this.store.pipe(select(GenresSelectors.getGenresLoaded));
  allGenres$ = this.store.pipe(select(GenresSelectors.getAllGenres));
  selectedGenres$ = this.store.pipe(select(GenresSelectors.getSelected));

  constructor(private readonly store: Store<fromGenres.GenresPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
