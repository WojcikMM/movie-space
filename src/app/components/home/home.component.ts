import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { GenresListService } from './../../services/genres-list.service';
import { MovieDiscoverService } from '../../services/movie-discover.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [MovieDiscoverService, GenresListService]
})
export class HomeComponent {

  moviesList: Array<Movie>;

  constructor(private _movieService: MovieDiscoverService, private _genreService: GenresListService, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      const genreId: number = parseInt(params.id, null);
      this.moviesList = [];
      this._genreService.getGenresList().subscribe(genreResults => {
        this._movieService.getReleases(genreId).subscribe(movies => {
          this.moviesList =  movies.results.map(movie => {
            movie.genre_list = genreResults.genres.filter(m => movie.genre_ids.indexOf(m.id) !== -1);
            return movie;
          });
        });
      });
    });
  }
}
