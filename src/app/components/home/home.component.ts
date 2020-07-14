import { Component } from '@angular/core';
import {
  MovieDto,
  MovieType
} from '../../modules/shared';
import { HomeService } from './home.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public loading = true;
  public currentMovieType: MovieType;
  public movies$: Observable<MovieDto[]> = this._homeService.getMovies$().pipe(tap(() => {
    this.loading = false;
  }));

  constructor(private readonly _homeService: HomeService) {
    this.currentMovieType = _homeService.movieType;
  }

  setMovieType(movieType: MovieType) {
    this.loading = true;
    this._homeService.movieType = this.currentMovieType = movieType;
  }
}
