import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { MovieDto } from '../../../shared';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {

  @Input()
  movie: MovieDto;
  @Input()
  selectedGenreId = 0;
  score = 0;

  ngOnInit(): void {
    this.score = this.movie.vote_average * 10;
  }
}
