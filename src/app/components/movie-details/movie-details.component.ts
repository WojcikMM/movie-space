import { Component } from '@angular/core';
import { MovieDetailsService } from '../../services/movie-details.service';
import { MovieDetailsResult } from '../../models/movie-details/MovieDetailsResult';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { environment } from '../../../environments/environment';
import { Cast } from 'src/app/models/movie-details/Cast';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  movieDetals: MovieDetailsResult;
  poster_url_prefix = 'https://image.tmdb.org/t/p/w300/';
  castArray: Array<Cast>;

  constructor(private _movieDetailService: MovieDetailsService, private route: ActivatedRoute) {
    const movieId = +this.route.snapshot.paramMap.get('id');
    this._movieDetailService.getMovieDetails(movieId).subscribe(result => {
      this.movieDetals = result;
      this.castArray =  result.credits.cast.slice(0, 12);
    });
   }

   getPosterUrl = () => this.movieDetals.poster_path === null ?
      '/assets/poster-not-found.jpg'
      : environment.poster_url_prefix + this.movieDetals.poster_path

  getCastPersonUrl = (imageSuffix: string, gender: number) => imageSuffix === null ?
      `/assets/${gender === 1 ? 'wo' : ''}man-placeholder-img.jpg`
      : environment.poster_url_prefix + imageSuffix


}
