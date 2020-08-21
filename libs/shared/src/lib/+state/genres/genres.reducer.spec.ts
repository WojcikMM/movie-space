import { GenreEntity } from '../../models';
import * as GenresActions from './genres.actions';
import { State, initialState, reducer } from './genres.reducer';

describe('Genres Reducer', () => {
  const createGenresEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as GenreEntity);

  beforeEach(() => {
  });

  it('WHEN valid loadGenres action THEN state should not contain additional ', () => {
    const action = GenresActions.loadGenres();

    const result = reducer(initialState, action);

    expect(result.error).toBeNull();
    expect(result.loaded).toBeFalsy();
    expect(result.entities).toEqual({});
  });

  it('WHEN valid loadGenresSuccess action THEN state should contain given genres and set loaded state to true', () => {
    const genres = [
      createGenresEntity(1),
      createGenresEntity(2)
    ];
    const action = GenresActions.loadGenresSuccess({ genres });

    const result: State = reducer(initialState, action);

    expect(result.loaded).toBe(true);
    expect(result.ids.length).toBe(2);
    expect(result.entities).toEqual({ 1: genres[0], 2: genres[1] });
  });

  it('WHEN valid loadGenresFailure action THEN state should contain initial state with described error', () => {
    const error = new Error('sample error');

    const action = GenresActions.loadGenresFailure({ error });
    const result = reducer(initialState, action);

    expect(result.error).toEqual(error);
    expect(result.loaded).toBeFalsy();
    expect(result.entities).toEqual({});
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
