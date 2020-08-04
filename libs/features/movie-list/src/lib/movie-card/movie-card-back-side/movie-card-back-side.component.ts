import {
  Component,
  Input
} from '@angular/core';
import { MovieDto } from '@movie-space/shared';

@Component({
  selector: 'ms-list-movie-card-back-size',
  templateUrl: './movie-card-back-side.component.html',
  styleUrls: ['./movie-card-back-side.component.scss']
})
export class MovieCardBackSideComponent {

  @Input() movie: MovieDto;
  selectedGenreId: number;
}
