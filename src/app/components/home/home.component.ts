import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieDiscoverService } from '../../services/movie-discover.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  movies: Array<Movie>;

  constructor(private _movieService: MovieDiscoverService, private route: ActivatedRoute) {
    const genreId: number = parseInt(this.route.snapshot.paramMap.get('genre-id'), null);
    this._movieService.getReleases(genreId).subscribe(result => {
      this.movies = result.results;
    });
  }
  ngOnInit(): void {

   }
}
