import {
  Component,
  Input
} from '@angular/core';
import { MovieEntity } from '../../models';

@Component({
  selector: 'ms-list-movie-card-back-side',
  templateUrl: './movie-card-back-side.component.html',
  styleUrls: ['./movie-card-back-side.component.scss']
})
export class MovieCardBackSideComponent {

  @Input() movie: MovieEntity;
}
