import { Component } from '@angular/core';
import { MovieDetailsService } from '../../services/movie-details.service';
import { MovieDetailsResult } from '../../models/movie-details/MovieDetailsResult';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  movieDetals: MovieDetailsResult;
  poster_url_prefix = 'https://image.tmdb.org/t/p/w300/';

  constructor(private _movieDetailService: MovieDetailsService, private route: ActivatedRoute) {
    const movieId = +this.route.snapshot.paramMap.get('id');
    this._movieDetailService.getMovieDetails(movieId).subscribe(result => {
      this.movieDetals = result;
    });
   }

   getPosterUrl() {
    return this.movieDetals.poster_path === null ?
      '/assets/poster-not-found.jpg'
      : environment.poster_url_prefix + this.movieDetals.poster_path;
  }


}
