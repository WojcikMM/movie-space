import { Genre } from './../../models/genre';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { GenresListService } from './../../services/genres-list.service';
import { MovieDiscoverService } from '../../services/movie-discover.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [MovieDiscoverService, GenresListService]
})
export class HomeComponent implements OnInit {

  moviesList: Array<Movie>;
  genreList: Array<Genre>;
  loading: boolean;

  constructor(private _movieService: MovieDiscoverService, private _genreService: GenresListService, private route: ActivatedRoute) {}

  moviesOrderChanged(moviesList: Array<Movie>) {
    this.moviesList = moviesList;
 }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;
      const genreId: number = parseInt(params.id, null);
      this.moviesList = [];
      this._genreService.getGenresList().subscribe(genreResults => {
        this.genreList = genreResults.genres;
        this._movieService.getReleases(genreId).subscribe(movies => {
          this.moviesList = movies.results.map(movie => {
            movie.genre_list = genreResults.genres.filter(m => movie.genre_ids.indexOf(m.id) !== -1);
            return movie;
          });
          this.loading = false;
        });
      });
    });
  }

}
