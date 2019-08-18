import { Component } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieSearchService } from '../../services/movie-search.service';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent {

  private searchResultsPage = 1;
  private maxSearchResultsCount = 5;
  private debounceTimeout = 400;
  searchResults: Array<Movie>;
  term = new FormControl();

  constructor(private movieSearchService: MovieSearchService) {
    this.term.valueChanges
    .pipe(debounceTime(this.debounceTimeout))
    .pipe(distinctUntilChanged())
    .subscribe(searchQuery => this.searchMovies(searchQuery));
  }

private searchMovies(query: string) {
  if ( !query ) {
    this.searchResults = [];
  } else {

    this.movieSearchService
    .searchForMovies(query, this.searchResultsPage)
    .subscribe(result => {
      this.searchResults = result.results.slice(0, this.maxSearchResultsCount);
    });
}}

endOfSearching() {
  this.term.reset();
}

}
