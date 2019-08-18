import { Movie } from './../../models/movie';
import { Genre } from './../../models/genre';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-genre-filters',
  templateUrl: './genre-filters.component.html',
  styleUrls: ['./genre-filters.component.scss']
})
export class GenreFiltersComponent implements OnInit {

  @Input()
  genres: Array<Genre>;
  @Input()
  moviesList: Array<Movie>;
  @Output()
  moviesOrderChange: EventEmitter<Array<Movie>> = new EventEmitter<Array<Movie>>();

  activeOrderFilter: Subject<'release-date' | 'rating-score'> = new Subject();
  activeOrderFilterValue: 'release-date' | 'rating-score';

  constructor() {
    this.activeOrderFilter.subscribe(orderingType => {
      if (this.activeOrderFilterValue !== orderingType) {
        this.activeOrderFilterValue = orderingType;
        this.orderBy(orderingType);
      }
    });
  }

  ngOnInit() {
    this.activeOrderFilter.next('release-date');
  }

  changeOrderFilter = (type: 'release-date' | 'rating-score') => this.activeOrderFilter.next(type);

  orderBy(condition: 'release-date' | 'rating-score') {
    const orderedMoviesList = this.moviesList.sort((prev, next) => {
      if (condition === 'rating-score') {
        return prev.vote_average > next.vote_average ? -1
          : prev.vote_average < next.vote_average ? 1
            : prev.vote_count > next.vote_count ? -1
              : prev.vote_count < next.vote_count ? 1
                : 0;
      } else {
        return prev.release_date > next.release_date ? -1
          : prev.release_date < next.release_date ? 1
            : 0;
      }
    });
    this.moviesOrderChange.emit(orderedMoviesList);
  }

}
