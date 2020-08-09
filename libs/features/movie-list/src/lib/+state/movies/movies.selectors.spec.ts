import { moviesAdapter, initialState } from './movies.reducer';
import * as MoviesSelectors from './movies.selectors';

describe('Movies Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      movies: moviesAdapter.setAll(
        [
          {
            id: 1,
            title: 'sample title',
            overview: 'sample overview',
            posterPath: 'sample/poster/path',
            votesAverage: 10,
            votesCount: 100,
            genresIds: [],
            score: 75,
            releaseDate: new Date(2020, 1, 2)
          },
          {
            id: 2,
            title: 'sample title 2',
            overview: 'sample overview 2',
            posterPath: 'sample/poster/path/2',
            votesAverage: 8,
            votesCount: 16,
            genresIds: [],
            score: 70,
            releaseDate: new Date(2020, 2, 5)
          },
          {
            id: 1,
            title: 'sample title',
            overview: 'sample overview',
            posterPath: 'sample/poster/path',
            votesAverage: 3,
            votesCount: 255,
            genresIds: [],
            score: 73,
            releaseDate: new Date(2020, 8, 5)
          }

        ],
        {
          ...initialState,
          loaded: true
        }
      )
    };
  });

  describe('GIVEN getLoadingState', () => {

    it('WHEN loading state is true THEN should return true value', () => {
      const results = MoviesSelectors.getLoadingState({
        movies: {
          ...state.movies,
          loading: true
        }
      });

      expect(results).toBe(true);
    });

    it('WHEN loading state is true THEN should return true value', () => {
      const results = MoviesSelectors.getLoadingState({
        movies: {
          ...state.movies,
          loading: false
        }
      });

      expect(results).toBe(false);
    });

  });

  describe('GIVEN getMoviesError', () => {

    it('WHEN state contains movies THEN should return movies array', () => {
      const results = MoviesSelectors.getAllMovies({
        movies: {
          ...state.movies
          }
        });

      expect(results).toEqual(Object.values(state.movies.entities));

    });

  });

  describe('GIVEN getCurrentPageNumber', () => {
  });

  describe('GIVEN getAllMovies', () => {
  });

  describe('GIVEN getSelectedMovieType', () => {
  });
});
