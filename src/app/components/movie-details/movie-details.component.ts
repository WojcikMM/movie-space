import { Component } from '@angular/core';
import { MovieDetailsService } from '../../services/movie-details.service';
import { MovieDetailsResult } from '../../models/movie-details/MovieDetailsResult';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

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
    this.GetMovieDetails(movieId);
   }

  private GetMovieDetails(movieId: number) {
    this._movieDetailService.getMovieDetails(movieId).subscribe(result => { this.movieDetals = result; });
  }
}
