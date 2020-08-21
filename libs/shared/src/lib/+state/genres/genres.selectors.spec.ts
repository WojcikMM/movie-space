import { GenreEntity } from '../../models';
import { genresAdapter, initialState } from './genres.reducer';
import * as GenresSelectors from './genres.selectors';

describe('GIVEN Genres Selectors', () => {
  const createGenresEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as GenreEntity);

  let state;

  beforeEach(() => {
    state = {
      genres: genresAdapter.setAll(
        [
          createGenresEntity(1),
          createGenresEntity(2),
          createGenresEntity(3)
        ],
        {
          ...initialState
        }
      )
    };
  });

    it('WHEN called getAllGenres() THEN should return the list of Genres', () => {
      const results = GenresSelectors.getAllGenres(state);

      expect(results).toEqual(Object.values(state.genres.entities));
    });
});
