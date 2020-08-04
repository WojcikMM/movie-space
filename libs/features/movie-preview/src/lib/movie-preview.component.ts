import { Component } from '@angular/core';
import {
  CastDto,
  MovieDetailsDto,
  MoviesClientService
} from '@movie-space/shared';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../apps/webapp/src/environments/environment';

@Component({
  selector: 'ms-preview-movie-details',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.scss']
})
export class MoviePreviewComponent {
  movieDetails: MovieDetailsDto;
  posterPrefix: string = environment.posterUrlPrefix;
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
