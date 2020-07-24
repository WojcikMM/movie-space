import {
  Component,
  Input
} from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-movie-card-front-side',
  templateUrl: './movie-card-front-side.component.html',
  styleUrls: ['./movie-card-front-side.component.scss']
})
export class MovieCardFrontSideComponent {

  @Input() movieTitle: string;
  @Input() posterUrl: string;
  posterPrefix = environment.posterUrlPrefix;
  posterPlaceholderUrl = environment.posterUrlPlaceholderUrl;

}
