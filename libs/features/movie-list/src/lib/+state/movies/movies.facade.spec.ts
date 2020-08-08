import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';
import { MoviesEffects } from './movies.effects';
import { MoviesFacade } from './movies.facade';

import * as MoviesActions from './movies.actions';
import {
  MOVIES_FEATURE_KEY,
  State,
  reducer
} from './movies.reducer';
import { MovieType, MoviesClientService } from '@movie-space/shared';
import { of } from 'rxjs';

interface TestSchema {
  movies: State;
}

describe('MoviesFacade', () => {
  let facade: MoviesFacade;
  let store: Store<TestSchema>;

  const moviesClientServiceSpy = {
    getMovieByType: jest.fn()
  };

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(MOVIES_FEATURE_KEY, reducer),
        EffectsModule.forFeature([MoviesEffects])
      ],
      providers: [MoviesFacade]
    })
    class CustomFeatureModule {
    }

    @NgModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        CustomFeatureModule
      ],
      providers: [
        {
          provide: MoviesClientService,
          useValue: moviesClientServiceSpy
        }
      ]

    })
    class RootModule {
    }

    TestBed.configureTestingModule({ imports: [RootModule] });

    store = TestBed.get(Store);
    facade = TestBed.get(MoviesFacade);
  });


  describe('GIVEN setMovieType method', () => {
    it('WHEN call THEN should call dispatch method with correct action', () => {
      spyOn(store, 'dispatch');
      moviesClientServiceSpy.getMovieByType.mockReturnValue(of([]));
      facade.setMovieType();

      expect(store.dispatch).toBeCalledWith(MoviesActions.loadMovies({ movieType: MovieType.NOW_PLAYING }));
    });
  });

  describe('GIVEN loadNextPage method', () => {
    it('WHEN call THEN should call dispatch method with correct action', () => {
      spyOn(store, 'dispatch');
      moviesClientServiceSpy.getMovieByType.mockReturnValue(of([]));
      facade.loadNextPage();

      expect(store.dispatch).toBeCalledWith(MoviesActions.loadNextPage());
    });
  });
});
