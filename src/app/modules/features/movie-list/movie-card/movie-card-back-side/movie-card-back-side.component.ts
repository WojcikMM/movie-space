import {
  Component,
  Input
} from '@angular/core';
import { MovieDto } from '../../../../shared';

@Component({
  selector: 'app-movie-card-back-size',
  templateUrl: './movie-card-back-side.component.html',
  styleUrls: ['./movie-card-back-side.component.scss']
})
export class MovieCardBackSideComponent {

  @Input() movie: MovieDto;
  selectedGenreId: number;
}
