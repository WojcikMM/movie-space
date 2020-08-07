import { MoviesEntity } from './movies.models';
import { moviesAdapter, initialState } from './movies.reducer';
import * as MoviesSelectors from './movies.selectors';

describe('Movies Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMoviesId = (it) => it['id'];
  const createMoviesEntity = (id: string, name = '') =>
    ({

    } as MoviesEntity);

  let state;

  beforeEach(() => {
    state = {
      movies: moviesAdapter.addAll(
        [
          createMoviesEntity('PRODUCT-AAA'),
          createMoviesEntity('PRODUCT-BBB'),
          createMoviesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Movies Selectors', () => {
    it('getAllMovies() should return the list of Movies', () => {
      const results = MoviesSelectors.getAllMovies(state);
      const selId = getMoviesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = MoviesSelectors.getSelected(state);
      const selId = getMoviesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getMoviesLoaded() should return the current 'loaded' status", () => {
      const result = MoviesSelectors.getMoviesLoaded(state);

      expect(result).toBe(true);
    });

    it("getMoviesError() should return the current 'error' state", () => {
      const result = MoviesSelectors.getMoviesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
