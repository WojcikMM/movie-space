import {
  Input,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';
import { MovieType } from '../../models/movie-type.enum';
import { GenreFilterButtonViewModel } from './genre-filter-button.view-model';


@Component({
  selector: 'app-genre-filters',
  templateUrl: './genre-filters.component.html',
  styleUrls: ['./genre-filters.component.scss']
})
export class GenreFiltersComponent {

  @Input()
  public set currentMovieType(value: MovieType) {
    this._setupViewModel(value);
  }

  @Output()
  readonly movieTypeChangedEvent: EventEmitter<MovieType> = new EventEmitter<MovieType>();
  public filtersViewModels: GenreFilterButtonViewModel[];

  private _setupViewModel(currentMovieType: MovieType): void {
    this.filtersViewModels = [
      {
        type: MovieType.NOW_PLAYING,
        label: 'Now playing',
        isActive: currentMovieType === MovieType.NOW_PLAYING
      },
      {
        type: MovieType.POPULAR,
        label: 'Popular',
        isActive: currentMovieType === MovieType.POPULAR
      },
      {
        type: MovieType.TOP_RATED,
        label: 'Top rated',
        isActive: currentMovieType === MovieType.TOP_RATED
      },
      {
        type: MovieType.UPCOMING,
        label: 'Upcoming',
        isActive: currentMovieType === MovieType.UPCOMING
      },
    ];
  }


}
