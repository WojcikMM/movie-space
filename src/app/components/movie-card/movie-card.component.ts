import { Component } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieDiscoverService } from '../../services/movie-discover.service';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  movies: Array<Movie>;
  poster_url_prefix = 'https://image.tmdb.org/t/p/w300/';

  constructor(private _movieService: MovieDiscoverService) {

    this._movieService.getReleases().subscribe(result => {
      this.movies = result.results;
    });
  }
}
