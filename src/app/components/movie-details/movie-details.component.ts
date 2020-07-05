import { Component } from '@angular/core';
import { MovieDetailsService } from '../../services/movie-details.service';
import { MovieDetailsResult } from '../../models/movie-details/MovieDetailsResult';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Cast } from 'src/app/models/movie-details/Cast';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  movieDetails: MovieDetailsResult;
  posterPrefix: string  = environment.posterUrlPrefix;
  castArray: Array<Cast>;

  constructor(private _movieDetailService: MovieDetailsService, private route: ActivatedRoute) {
    const movieId = +this.route.snapshot.paramMap.get('id');
    this._movieDetailService.getMovieDetails(movieId).subscribe(result => {
      this.movieDetails = result;
      this.castArray =  result.credits.cast.slice(0, 12);
    });
   }
}
