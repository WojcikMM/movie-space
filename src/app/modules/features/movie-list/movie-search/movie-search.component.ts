import { Component } from '@angular/core';
import {
  MovieDto,
  MoviesClientService
} from '../../../shared';
import { FormControl } from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent {
  private maxSearchResultsCount = 5;
  private debounceTimeout = 400;
  searchResults: Array<MovieDto>;
  term = new FormControl();

  constructor(private readonly _movieClientService: MoviesClientService) {
    this.term.valueChanges
      .pipe(debounceTime(this.debounceTimeout))
      .pipe(distinctUntilChanged())
      .subscribe(searchQuery => this.searchMovies(searchQuery));
  }

  private searchMovies(query: string) {
    if (!query) {
      this.searchResults = [];
    } else {

      this._movieClientService
        .searchMovie(query)
        .subscribe(result => {
          this.searchResults = result.slice(0, this.maxSearchResultsCount);
        });
    }
  }

  endOfSearching() {
    this.term.reset();
  }

}
