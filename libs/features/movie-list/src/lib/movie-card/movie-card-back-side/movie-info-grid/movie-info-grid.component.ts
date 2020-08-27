import {
  Component,
  Input
} from '@angular/core';
import { MovieEntity } from '../../../models';
import { GenreEntity } from '@movie-space/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ms-list-movie-info-grid',
  templateUrl: './movie-info-grid.component.html',
  styleUrls: ['./movie-info-grid.component.scss']
})
export class MovieInfoGridComponent {

  @Input() movie: MovieEntity;

  @Input()
  set allGenres$(value$: Observable<GenreEntity[]>) {
    this.selectedGenres$ = value$.pipe(
      map(genres => genres.filter(genre => this.movie.genresIds.includes(genre.id)))
    );
  }

  selectedGenres$: Observable<GenreEntity[]>;
}
