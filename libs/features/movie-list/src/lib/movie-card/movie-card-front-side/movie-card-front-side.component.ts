import {
  Component,
  Input
} from '@angular/core';
import { GLOBAL_CONST } from '@movie-space/shared';

@Component({
  selector: 'ms-list-movie-card-front-side',
  templateUrl: './movie-card-front-side.component.html',
  styleUrls: ['./movie-card-front-side.component.scss']
})
export class MovieCardFrontSideComponent {

  @Input() movieTitle: string;
  @Input() posterUrl: string;
  posterPrefix = GLOBAL_CONST.MOVIE_DB.POSTER_URL_PREFIX;
  posterPlaceholderUrl = GLOBAL_CONST.MOVIE_DB.POSTER_PLACEHOLDER_SRC;

}
