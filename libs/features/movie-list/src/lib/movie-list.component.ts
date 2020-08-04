import { Component } from '@angular/core';
import {
  MovieDto,
  MovieType
} from '@movie-space/shared';
import { MovieListService } from './movie-list.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-list-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  public loading = true;
  public currentMovieType: MovieType;
  public movies$: Observable<MovieDto[]> = this._homeService.getMovies$().pipe(tap(() => {
    this.loading = false;
  }));

  constructor(private readonly _homeService: MovieListService) {
    this.currentMovieType = _homeService.movieType;
  }

  setMovieType(movieType: MovieType) {
    this.loading = true;
    this._homeService.movieType = this.currentMovieType = movieType;
  }

  onScrolledToBottom() {
    this.loading = true;
    this._homeService.nextPage();
  }
}
