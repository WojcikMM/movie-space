import {
  Component,
  Input
} from '@angular/core';
import { MovieDto } from '../../../../../shared';

@Component({
  selector: 'app-movie-info-grid',
  templateUrl: './movie-info-grid.component.html',
  styleUrls: ['./movie-info-grid.component.scss']
})
export class MovieInfoGridComponent {

  @Input() movie: MovieDto;
  @Input() selectedGenreIds: number[];
}
