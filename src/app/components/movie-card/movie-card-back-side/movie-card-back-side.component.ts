import { Component, Input } from '@angular/core';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-movie-card-back-size',
  templateUrl: './movie-card-back-side.component.html',
  styleUrls: ['./movie-card-back-side.component.scss']
})
export class MovieCardBackSideComponent {

  @Input() movie: Movie;
  selectedGenreId: number;
}
