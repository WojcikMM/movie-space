import { Component, Input } from '@angular/core';
import { Movie } from '../../../../models/movie';

@Component({
  selector: 'app-movie-info-grid',
  templateUrl: './movie-info-grid.component.html',
  styleUrls: ['./movie-info-grid.component.scss']
})
export class MovieInfoGridComponent {

  @Input() movie: Movie;
  @Input() selectedGenreIds: number[];
}
