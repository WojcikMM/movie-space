import { Component, Input, OnChanges, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css', './movie-card-back.component.css'],
})
export class MovieCardComponent implements OnInit {

  @Input()
  movie: Movie;
  style_1 = '<style> width: 60% </style>';
  score = 0;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.score = 100 - (this.movie.vote_average * 10);
    console.log('On init: ' + this.movie);
  }
  getPosterUrl() {
    return this.movie.poster_path === null ?
      '../../../assets/poster-not-found.JPG'
      : environment.poster_url_prefix + this.movie.poster_path;
  }


}
