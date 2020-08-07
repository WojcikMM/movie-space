import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { GenresEntity } from './genres.models';
import { GenresEffects } from './genres.effects';
import { GenresFacade } from './genres.facade';

import * as GenresActions from './genres.actions';
import {
  GENRES_FEATURE_KEY,
  State,
  reducer,
} from './genres.reducer';

interface TestSchema {
  genres: State;
}

describe('GenresFacade', () => {
  let facade: GenresFacade;
  let store: Store<TestSchema>;
  const createGenresEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GenresEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(GENRES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([GenresEffects]),
        ],
        providers: [GenresFacade],
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
      facade = TestBed.get(GenresFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allGenres$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(GenresActions.loadGenres());

        list = await readFirst(facade.allGenres$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadGenresSuccess` to manually update list
     */
    it('allGenres$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allGenres$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          GenresActions.loadGenresSuccess({
            genres: [createGenresEntity('AAA'), createGenresEntity('BBB')],
          })
        );

        list = await readFirst(facade.allGenres$);
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
