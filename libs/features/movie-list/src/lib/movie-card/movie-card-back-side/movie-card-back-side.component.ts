import {
  Component,
  Input
} from '@angular/core';
import { MoviesEntity } from '@movie-space/features/movie-list';

@Component({
  selector: 'ms-list-movie-card-back-size',
  templateUrl: './movie-card-back-side.component.html',
  styleUrls: ['./movie-card-back-side.component.scss']
})
export class MovieCardBackSideComponent {

  @Input() movie: MoviesEntity;
}
