import { Component } from '@angular/core';
import {
  CastDto,
  GLOBAL_CONST,
  MovieDetailsDto,
  MoviesClientService
} from '@movie-space/shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-preview-movie-details',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.scss']
})
export class MoviePreviewComponent {
  movieDetails: MovieDetailsDto;
  posterPrefix: string = GLOBAL_CONST.MOVIE_DB.POSTER_URL_PREFIX;
  castArray: Array<CastDto>;

  constructor(private readonly _moviesClientService: MoviesClientService,
              private readonly route: ActivatedRoute) {
    const movieId = +this.route.snapshot.paramMap.get('id');
    this._moviesClientService.getMovieById(movieId).subscribe(result => {
      this.movieDetails = result;
      this.castArray = result.credits.cast.slice(0, 12);
    });
  }
}
