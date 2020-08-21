import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromGenres from './genres.reducer';
import * as GenresSelectors from './genres.selectors';
import * as GenresActions from './genres.actions';

@Injectable()
export class GenresFacade {
  allGenres$ = this.store.pipe(select(GenresSelectors.getAllGenres));

  constructor(private readonly store: Store<fromGenres.GenresPartialState>) {
  }

  loadGenres(): void {
    this.store.dispatch(GenresActions.loadGenres());
  }
}
