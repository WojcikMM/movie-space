import { GenreEntity } from './genres.models';
import { genresAdapter, initialState } from './genres.reducer';
import * as GenresSelectors from './genres.selectors';

describe('Genres Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGenresId = (it) => it['id'];
  const createGenresEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GenreEntity);

  let state;

  beforeEach(() => {
    state = {
      genres: genresAdapter.setAll(
        [
          createGenresEntity('PRODUCT-AAA'),
          createGenresEntity('PRODUCT-BBB'),
          createGenresEntity('PRODUCT-CCC'),
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

  describe('Genres Selectors', () => {
    it('getAllGenres() should return the list of Genres', () => {
      const results = GenresSelectors.getAllGenres(state);
      const selId = getGenresId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = GenresSelectors.getSelected(state);
      const selId = getGenresId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getGenresLoaded() should return the current 'loaded' status", () => {
      const result = GenresSelectors.getGenresLoaded(state);

      expect(result).toBe(true);
    });

    it("getGenresError() should return the current 'error' state", () => {
      const result = GenresSelectors.getGenresError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
