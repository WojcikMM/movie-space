import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { HomeService } from './home.service';
import { MovieType } from '../../models/movie-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  moviesList: Array<Movie> = [];
  loading: boolean;
  public currentMovieType: MovieType;

  constructor(private readonly _homeService: HomeService) {
    this.currentMovieType = _homeService.movieType;
  }

  setMovieType(movieType: MovieType) {
    this.moviesList = [];
    this._homeService.movieType = this.currentMovieType = movieType;
    this._getMovies();
  }

  ngOnInit(): void {
    this._getMovies();
  }

  private _getMovies() {
    this._homeService.getMovies()
      .subscribe((movies: Movie[]) => {
        this.moviesList.push(...movies);
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }
}
