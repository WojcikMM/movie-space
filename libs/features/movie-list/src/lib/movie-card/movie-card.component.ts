import {
  Input,
  Component
} from '@angular/core';
import { MoviesEntity } from '../models';

@Component({
  selector: 'ms-list-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {

  @Input()
  movie: MoviesEntity;
}
