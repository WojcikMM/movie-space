import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { GenresEffects } from './genres.effects';
import { GenresFacade } from './genres.facade';

import * as GenresActions from './genres.actions';
import {
  GENRES_FEATURE_KEY,
  State,
  reducer
} from './genres.reducer';
import { GenresClientService } from '../../services/clients/genres';

interface TestSchema {
  genres: State;
}

describe('GIVEN GenresFacade', () => {
  let facade: GenresFacade;
  let store: Store<TestSchema>;
  let genresClientServiceSpy;

  beforeEach(() => {
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      genresClientServiceSpy = {
        loadGenres: jest.fn()
      };

      @NgModule({
        imports: [
          StoreModule.forFeature(GENRES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([GenresEffects])
        ],
        providers: [
          GenresFacade,
          {
            provide: GenresClientService,
            useValue: genresClientServiceSpy
          }
        ]
      })
      class CustomFeatureModule {
      }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {
      }

      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(GenresFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        const list = await readFirst(facade.allGenres$);

        expect(list).toEqual([]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('WHEN call loadGenres THEN action loadGenres should be called', () => {
      spyOn(store, 'dispatch');
      genresClientServiceSpy.loadGenres.mockReturnValue([]);
      facade.loadGenres();

      expect(store.dispatch).toBeCalledWith(GenresActions.loadGenres());
    });
  });

});
