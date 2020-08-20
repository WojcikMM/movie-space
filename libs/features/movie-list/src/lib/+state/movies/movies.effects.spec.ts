import { TestBed } from '@angular/core/testing';

import {
  Observable,
  of
} from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import {
  MockStore,
  provideMockStore
} from '@ngrx/store/testing';

import {
  DataPersistence,
  NxModule
} from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { MoviesEffects } from './movies.effects';
import * as MoviesActions from './movies.actions';
import * as MoviesSelectors from './movies.selectors';
import {
  MovieDto,
  MoviesClientService,
  MovieType
} from '@movie-space/shared';
import { MoviesEntity } from '../../models';

describe('MoviesEffects', () => {
  let actions: Observable<any>;
  let effects: MoviesEffects;
  let mockStore: MockStore;
  let moviesClientServiceSpy;
  let sampleMoviesDtoArray: MovieDto[];
  let expectedMoviesEntityArray: MoviesEntity[];

  beforeEach(() => {
    moviesClientServiceSpy = {
      getMovieByType: jest.fn()
    };
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        MoviesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: MoviesClientService,
          useValue: moviesClientServiceSpy
        }
      ]
    });

    effects = TestBed.inject(MoviesEffects);
    mockStore = TestBed.inject(MockStore);

    sampleMoviesDtoArray = [
      {
        id: 1,
        title: 'sample title',
        overview: 'sample overview',
        poster_path: 'sample/poster/path',
        vote_average: 5,
        vote_count: 10,
        genre_ids: [1, 3, 5],
        release_date: new Date(2020, 1, 2),
        adult: false,
        video: false,
        backdrop_path: 'sample/backdrop/path',
        popularity: 10,
        original_title: 'Original title',
        original_language: 'en-US'
      } as MovieDto,
      {
        id: 2,
        title: 'sample title 2',
        overview: 'sample overview 2',
        poster_path: 'sample/poster/path/2',
        vote_average: 4,
        vote_count: 14,
        genre_ids: [5, 7],
        release_date: new Date(2020, 1, 5),
        adult: false,
        video: false,
        backdrop_path: 'sample/backdrop/path/2',
        popularity: 9,
        original_title: 'Original title 2',
        original_language: 'pl-PL'
      } as MovieDto
    ];
    expectedMoviesEntityArray = sampleMoviesDtoArray.map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      genresIds: movie.genre_ids,
      votesCount: movie.vote_count,
      votesAverage: movie.vote_average,
      releaseDate: movie.release_date,
      posterPath: movie.poster_path,
      score: movie.vote_average * 10
    }));
  });

  describe('loadMovies$', () => {
    it('WHEN backend service is unavailable THEN should return loadMoviesFailure action', () => {
      const error = new Error('sample error');
      actions = hot('-a-|', { a: MoviesActions.loadMovies({ movieType: MovieType.NOW_PLAYING }) });
      moviesClientServiceSpy.getMovieByType.mockImplementation(() => {
        throw error;
      });

      const expected = hot('-a-|', {
        a: MoviesActions.loadMoviesFailure({ error })
      });

      expect(effects.loadMovies$).toBeObservable(expected);
    });

    it('WHEN backend return movies THEN should return loadMoviesSuccess with movies array', () => {


      actions = hot('-a-|', {
        a: MoviesActions.loadMovies({
          movieType: MovieType.NOW_PLAYING
        })
      });

      moviesClientServiceSpy.getMovieByType.mockReturnValue(of(sampleMoviesDtoArray));

      const expected = hot('-a-|', {
        a: MoviesActions.loadMoviesSuccess({
          movies: expectedMoviesEntityArray
        })
      });
      expect(effects.loadMovies$).toBeObservable(expected);
    });
  });

  describe('loadNextPage$', () => {
    it('WHEN backend service is unavailable THEN should return loadNextPageFailure action', () => {
      const error = new Error('sample error');

      mockStore.overrideSelector(MoviesSelectors.getMoviesState, {
        currentPage: 1,
        entities: {},
        loading: false,
        selectedMovieType: MovieType.NOW_PLAYING,
        ids: [],
        selectedId: '',
        error: null
      });

      actions = hot('-a-|', {
        a: MoviesActions.loadNextPage()
      });

      moviesClientServiceSpy.getMovieByType.mockImplementation(() => {
        throw error;
      });

      const expected = hot('-a-|', {
        a: MoviesActions.loadNextPageFailure({ error: error })
      });

      expect(effects.loadNextPage$).toBeObservable(expected);

    });

    it('WHEN backend return movies then should return loadNextPageSuccess action with movies array', () => {

      mockStore.overrideSelector(MoviesSelectors.getMoviesState, {
        currentPage: 1,
        entities: {},
        loading: false,
        selectedMovieType: MovieType.NOW_PLAYING,
        ids: [],
        selectedId: '',
        error: null
      });

      actions = hot('-a-|', {
        a: MoviesActions.loadNextPage()
      });


      moviesClientServiceSpy.getMovieByType.mockReturnValue(of(sampleMoviesDtoArray));

      const expected = hot('-a-|', {
        a: MoviesActions.loadNextPageSuccess({
          movies: expectedMoviesEntityArray
        })
      });
      expect(effects.loadNextPage$).toBeObservable(expected);
    });
  });
});
