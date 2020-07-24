import { Component } from '@angular/core';
import {
  CastDto,
  MovieDetailsDto,
  MoviesClientService
} from '../../shared/services/clients/movies';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-movie-details',
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
