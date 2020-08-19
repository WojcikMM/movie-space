import * as MoviesActions from './movies.actions';
import { initialState, reducer, State } from './movies.reducer';
import { MovieType } from '@movie-space/shared';
import { MoviesEntity } from '@movie-space/features/movie-list';
import { Dictionary } from '@ngrx/entity';

describe('Movies Reducer', () => {

  // LoadMovies API actions

  let sampleDictionary: Dictionary<MoviesEntity>;

  beforeEach(() => {
    sampleDictionary = {
      [1]: {
        id: 1,
        posterPath: '/sample/poster',
        title: 'Translated title',
        overview: 'Sample movie about something',
        genresIds: [1, 2, 4],
        votesCount: 100,
        releaseDate: new Date(2020, 1, 2),
        score: 60,
        votesAverage: 2
      },
      [2]: {
        id: 2,
        posterPath: '/sample/poster2',
        title: 'Translated title2',
        overview: 'Sample movie about something2',
        genresIds: [2, 6, 7],
        votesCount: 666,
        releaseDate: new Date(2020, 6, 14),
        score: 80,
        votesAverage: 3
      }
    };
  });

  describe('GIVEN LoadMovies action', () => {

    // Movie types:
    // - MovieType.NOW_PLAYING,
    // - MovieType.UPCOMING,
    // - MovieType.TOP_RATED,
    // - MovieType.POPULAR
    Object.keys(MovieType)
      .filter((type) => Number.isNaN(+type))
      .forEach((movieType) => {
        it(`WHEN valid action with MovieType.${movieType} THEN state should contains empty entities, no error, and enabled loading state`, () => {

          const action = MoviesActions.loadMovies({ movieType: MovieType[movieType] });

          const result = reducer(initialState, action);

          expect(result.entities).toEqual({});
          expect(result.loading).toBeTruthy();
          expect(result.error).toBeNull();
        });
      });

    it('WHEN state contains any entities THEN should be removed', () => {
      const action = MoviesActions.loadMovies({ movieType: MovieType.POPULAR });

      const result = reducer({
        ...initialState,
        entities: {
          ...initialState.entities,
          ...sampleDictionary
        }
      }, action);

      expect(Object.values(result.entities)).toEqual([]);
    });


  });

  describe('GIVEN LoadMoviesSuccess action', () => {

    it('WHEN valid action THEN state should contain given entities, no error, and disabled loading state', () => {
      const sampleEntities = Object.values(sampleDictionary);
      const action = MoviesActions.loadMoviesSuccess({ movies: sampleEntities });

      const result = reducer(initialState, action);

      expect(Object.keys(result.entities).length).toEqual(sampleEntities.length);
      expect(Object.values(result.entities)).toEqual(sampleEntities);
      expect(result.error).toBeNull();
      expect(result.loading).toBeFalsy();
    });
  });

  describe('GIVEN LoadMoviesFailure action', () => {
    [
      {
        expectedErrorMessage: 'Sample error',
        errorObject: new Error('Sample error'),
        description: 'correct error object (with \'Sample error\' message)'
      },
      {
        expectedErrorMessage: 'Unknown error',
        errorObject: undefined,
        description: 'undefined'
      },
      {
        expectedErrorMessage: 'Unknown error',
        errorObject: null,
        description: 'null'
      }
    ].forEach(value => {
      describe(`WHEN given action with: ${value.description}`, () => {
        let action;
        let result: State;

        beforeEach(() => {
          action = MoviesActions.loadMoviesFailure({ error: value.errorObject });
          result = reducer(initialState, action);
        });

        it('THEN entities should be empty', () => {
          expect(Object.values(result.entities).length).toBe(0);
        });

        it('THEN loading state should be disabled', () => {
          expect(result.loading).toBeFalsy();
        });

        it('THEN error property should be equals error message', () => {
          expect(result.error).toEqual(value.expectedErrorMessage);
        });
      });
    });

  });

  // LoadNextPage API actions
   //TODO: Fill tests
  describe('GIVEN LoadNextPage action', () => {

    describe('WHEN valid action without parameters', () => {

      it('THEN loading state should be enabled', () => {

      });

      it('THEN error should be null', () => {

      });
    });

    it('WHEN valid action without parameters and any entities defined THEN should be not cleared', () => {

    });
  });

  //TODO: Fill tests
  describe('GIVEN LoadNextPageSuccess action', () => {
  });

  describe('GIVEN LoadNextPageFailure action', () => {
    [
      {
        expectedErrorMessage: 'Sample error',
        errorObject: new Error('Sample error'),
        description: 'correct error object (with \'Sample error\' message)'
      },
      {
        expectedErrorMessage: 'Unknown error',
        errorObject: undefined,
        description: 'undefined'
      },
      {
        expectedErrorMessage: 'Unknown error',
        errorObject: null,
        description: 'null'
      }
    ].forEach(value => {
      describe(`WHEN given action with: ${value.description}`, () => {
        let action;
        let result: State;

        beforeEach(() => {
          action = MoviesActions.loadNextPageFailure({ error: value.errorObject });
          result = reducer(initialState, action);
        });

        it('THEN entities should be empty', () => {
          expect(Object.values(result.entities).length).toBe(0);
        });

        it('THEN loading state should be disabled', () => {
          expect(result.loading).toBeFalsy();
        });

        it('THEN error property should be equals error message', () => {
          expect(result.error).toEqual(value.expectedErrorMessage);
        });
      });
    });
  });

  describe('Given unknown action', () => {
    it('WHEN action has no type THEN state should be unchanged', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
