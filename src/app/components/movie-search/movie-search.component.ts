import { Component } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieSearchService } from '../../services/movie-search.service';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent {

  private _searchResultsPage = 1;
  private _maxSearchResultsCount = 5;
  private _debounceTimeout = 400;

  searchValue: string;
  searchResults: Array<Movie>;
  term = new FormControl();

  constructor(private _movieSearchService: MovieSearchService) {
    this.term.valueChanges
    .pipe(debounceTime(this._debounceTimeout))
    .pipe(distinctUntilChanged())
    .subscribe(searchQuery => this.searchMovies(searchQuery));
  }

private searchMovies(query: string) {
  if ( !query ) {
    this.searchResults = [];
  } else {
    this._movieSearchService
    .searchForMovies(query, this._searchResultsPage)
    .subscribe(result => {
      this.searchResults = result.results.slice(0, this._maxSearchResultsCount);
    });
}}

endOfSearching() {
  this.searchResults = [];
  this.searchValue = '';
}

}
