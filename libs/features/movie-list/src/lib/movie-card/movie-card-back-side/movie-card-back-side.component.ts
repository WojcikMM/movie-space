import {
  Component,
  Input
} from '@angular/core';
import { MoviesEntity } from '../../models';

@Component({
  selector: 'ms-list-movie-card-back-side',
  templateUrl: './movie-card-back-side.component.html',
  styleUrls: ['./movie-card-back-side.component.scss']
})
export class MovieCardBackSideComponent {

  @Input() movie: MoviesEntity;
}
