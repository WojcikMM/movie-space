import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { GenresEffects } from './genres.effects';
import * as GenresActions from './genres.actions';

describe('GenresEffects', () => {
  let actions: Observable<any>;
  let effects: GenresEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GenresEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GenresEffects);
  });

  describe('loadGenres$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GenresActions.loadGenres() });

      const expected = hot('-a-|', {
        a: GenresActions.loadGenresSuccess({ genres: [] }),
      });

      expect(effects.loadGenres$).toBeObservable(expected);
    });
  });
});
