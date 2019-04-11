import { Component, Input, OnChanges, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css', './movie-card-back.component.css'],
})
export class MovieCardComponent implements OnInit {

  @Input()
  movie: Movie;
  score = 0;

  ngOnInit(): void {
    this.score = this.movie.vote_average * 10;
  }

  getPosterUrl() {
    return this.movie.poster_path === null ?
      '/assets/poster-not-found.jpg'
      : environment.poster_url_prefix + this.movie.poster_path;
  }

}
