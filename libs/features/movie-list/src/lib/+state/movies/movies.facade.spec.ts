import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { MoviesEntity } from './movies.models';
import { MoviesEffects } from './movies.effects';
import { MoviesFacade } from './movies.facade';

import * as MoviesActions from './movies.actions';
import {
  MOVIES_FEATURE_KEY,
  State,
  reducer,
} from './movies.reducer';

interface TestSchema {
  movies: State;
}

describe('MoviesFacade', () => {
  let facade: MoviesFacade;
  let store: Store<TestSchema>;
  const createMoviesEntity = (id: string, name = '') =>
    ({

    } as MoviesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(MOVIES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([MoviesEffects]),
        ],
        providers: [MoviesFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(MoviesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allMovies$);
        let isLoaded = await readFirst(facade.areMoviesLoading$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(MoviesActions.loadMovies());

        list = await readFirst(facade.allMovies$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadMoviesSuccess` to manually update list
     */
    it('allMovies$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allMovies$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          MoviesActions.loadMoviesSuccess({
            movies: [createMoviesEntity('AAA'), createMoviesEntity('BBB')],
          })
        );

        list = await readFirst(facade.allMovies$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
