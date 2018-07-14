import { Component } from '@angular/core';
import { MovieDetailsService } from '../../services/movie-details.service';
import { MovieDetailsResult } from '../../models/movie-details/MovieDetailsResult';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  movieDetals: MovieDetailsResult;

  constructor(private _movieDetailService: MovieDetailsService) {
    this._movieDetailService.getMovieDetails(2).subscribe(result => {this.movieDetals = result; });
   }


}
