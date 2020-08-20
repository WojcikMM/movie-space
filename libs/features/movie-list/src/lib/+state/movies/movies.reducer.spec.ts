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
          expect(result.selectedMovieType).toBe(MovieType[movieType]);
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
  describe('GIVEN LoadNextPage action', () => {

    describe('WHEN valid action without parameters', () => {
      let result;

      beforeEach(() => {
        const action = MoviesActions.loadNextPage();
        result = reducer(initialState, action);
      });

      it('THEN loading state should be enabled', () => {
        expect(result.loading).toBeTruthy();
      });

      it('THEN error should be null', () => {
        expect(result.error).toBeNull();
      });
    });

    it('WHEN valid action without parameters and any entities defined THEN should be not cleared', () => {
      const action = MoviesActions.loadNextPage();
      const result = reducer({
        ...initialState,
        entities: sampleDictionary
      }, action);

      expect(result.entities).toEqual(sampleDictionary);

    });
  });

  describe('GIVEN LoadNextPageSuccess action', () => {

    describe('WHEN valid action', () => {
      let result;
      let givenResponseEntities: Dictionary<MoviesEntity>;
      beforeEach(() => {

        givenResponseEntities = {
          1001: {
            id: 1001,
            title: 'Sample title 1001',
            overview: '-',
            votesAverage: 3.3,
            score: 33,
            votesCount: 100,
            posterPath: null,
            releaseDate: new Date(1993, 1, 1),
            genresIds: []
          },
          1002: {
            id: 1002,
            title: 'Sample title 1002',
            overview: '-',
            votesAverage: 5.1,
            score: 51,
            votesCount: 12,
            posterPath: null,
            releaseDate: new Date(1977, 3, 6),
            genresIds: [1, 5, 6]
          }
        };

        const action = MoviesActions.loadNextPageSuccess(
          { movies: Object.values<MoviesEntity>(givenResponseEntities) }
        );

        result = reducer({
          ...initialState,
          entities: {
            ...initialState.entities,
            ...sampleDictionary
          }
        }, action);
      });

      it('THEN state should contain extended entities', () => {
        expect(result.entities).toEqual({
          ...initialState.entities,
          ...sampleDictionary,
          ...givenResponseEntities
        });
      });

      it('THEN loading state should be disabled', () => {
        expect(result.loading).toBeFalsy();
      });

      it('THEN state error property should be null', () => {
        expect(result.error).toBeNull();
      });


    });

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
