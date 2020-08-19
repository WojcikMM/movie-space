import { Component } from '@angular/core';
import { MovieType } from '@movie-space/shared';
import { Observable } from 'rxjs';
import { MoviesFacade } from './+state/movies/movies.facade';
import { MoviesEntity } from '..';

@Component({
  selector: 'ms-list-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {

  loadedMovies$: Observable<MoviesEntity[]>;
  selectedMovieType$: Observable<MovieType>;
  isLoading$: Observable<boolean>;


  constructor(private readonly _moviesFacade: MoviesFacade) {
    this.loadedMovies$ = _moviesFacade.allMovies$;
    this.selectedMovieType$ =  _moviesFacade.selectedMovieType$
    this.isLoading$ = _moviesFacade.areMoviesLoading$;
    _moviesFacade.setMovieType();
  }

  setMovieType(movieType: MovieType) {
    this._moviesFacade.setMovieType(movieType);
  }

  onScrolledToBottom() {
    this._moviesFacade.loadNextPage();
  }
}
