import { MoviesEntity } from './movies.models';
import * as MoviesActions from './movies.actions';
import { State, initialState, reducer } from './movies.reducer';

describe('Movies Reducer', () => {

  beforeEach(() => {});

  describe('valid Movies actions', () => {
    it('loadMoviesSuccess should return set the list of known Movies', () => {
      const movies = [
        {

        } as MoviesEntity,
        {

        } as MoviesEntity
      ];
      const action = MoviesActions.loadMoviesSuccess({ movies });

      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
