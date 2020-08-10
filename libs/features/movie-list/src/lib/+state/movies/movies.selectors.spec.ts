import {
  initialState,
  moviesAdapter
} from './movies.reducer';
import * as MoviesSelectors from './movies.selectors';
import { MovieType } from '@movie-space/shared';

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

    it('WHEN state contains page number THEN should return it', () => {
      const currentPage = 4;
      const results = MoviesSelectors.getCurrentPageNumber({
        movies: {
          ...state.movies,
          currentPage
        }
      });

      expect(results).toBe(currentPage);
    });

    it('WHEN state not contain page number then should return null or undefined', () => {
      const currentPage = null;
      const results = MoviesSelectors.getCurrentPageNumber({
        movies: {
          ...state.movies,
          currentPage
        }
      });

      expect(results).toBe(currentPage);
    });
  });

  describe('GIVEN getAllMovies', () => {
    it('WHEN store has movies THEN should return all ones', () => {
      const result = MoviesSelectors.getAllMovies({
        movies: {
          ...state.movies
        }
      });

      expect(result).toEqual(Object.values(state.movies.entities));
    });

    it('WHEN store has no movies THEN should return empty array', () => {
      const result = MoviesSelectors.getAllMovies({
        movies: moviesAdapter.setAll([], {
          ...state.movies
        })
      });

      expect(result).toEqual([]);
    });
  });

  describe('GIVEN getSelectedMovieType', () => {

    it('WHEN initial state THEN MovieType.NOW_PLAYING should be returned', () => {
      const result = MoviesSelectors.getSelectedMovieType({
        movies: {
          ...initialState
        }
      });

      expect(result).toBe(MovieType.NOW_PLAYING);
    });


    it('WHEN MovieType.POPULAR is selected THEN should return one', () => {
      const result = MoviesSelectors.getSelectedMovieType({
        movies: {
          ...state.movies,
          selectedMovieType: MovieType.POPULAR
        }
      });

      expect(result).toBe(MovieType.POPULAR);
    });

    it('WHEN MovieType.NOW_PLAYING is selected THEN should return one', () => {
      const result = MoviesSelectors.getSelectedMovieType({
        movies: {
          ...state.movies,
          selectedMovieType: MovieType.NOW_PLAYING
        }
      });

      expect(result).toBe(MovieType.NOW_PLAYING);
    });

    it('WHEN MovieType.TOP_RATED is selected THEN should return one', () =>{
      const result = MoviesSelectors.getSelectedMovieType({
        movies: {
          ...state.movies,
          selectedMovieType: MovieType.TOP_RATED
        }
      });

      expect(result).toBe(MovieType.TOP_RATED);
    })

    it('WHEN MovieType.UPCOMING is selected THEN should return one', () =>{
      const result = MoviesSelectors.getSelectedMovieType({
        movies: {
          ...state.movies,
          selectedMovieType: MovieType.UPCOMING
        }
      });

      expect(result).toBe(MovieType.UPCOMING);
    })

  });
});
