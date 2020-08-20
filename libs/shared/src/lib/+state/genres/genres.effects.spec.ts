import { TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { GenresEffects } from './genres.effects';
import * as GenresActions from './genres.actions';
import { GenresClientService } from '../../services/clients/genres';

describe('GenresEffects', () => {
  let actions: Observable<any>;
  let effects: GenresEffects;
  let genresClientMock;

  beforeEach(() => {

    genresClientMock = {
      getGenresList: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GenresEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: GenresClientService, useValue: genresClientMock }
      ]
    });

    effects = TestBed.inject(GenresEffects);
  });

  describe('loadGenres$', () => {
    it('WHEN server is unavailable THEN should throw LoadGenresFailure action', () => {
      const error = new Error('Unknown error');
      genresClientMock.getGenresList.mockImplementation(() => {
        throw error;
      });
      actions = hot('-a-|', { a: GenresActions.loadGenres() });

      const expected = hot('-a-|', { a: GenresActions.loadGenresFailure({ error }) });

      expect(effects.loadGenres$).toBeObservable(expected);

    });

    it('WHEN server returns list of genres THEN should throw LoadGenresSuccess action', () => {
      const sampleResults = {
        genres: [
          {
            id: 1,
            name: 'Genre 1'
          },
          {
            id: 2,
            name: 'Genre 2'
          }
        ]
      }

      genresClientMock.getGenresList.mockReturnValue(of(sampleResults));

      actions = hot('-a-|', { a: GenresActions.loadGenres() });

      const expected = hot('-a-|', { a: GenresActions.loadGenresSuccess({ genres: sampleResults.genres }) });

      expect(effects.loadGenres$).toBeObservable(expected);
    });

  });
});
