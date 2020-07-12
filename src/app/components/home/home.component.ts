import {
  Component,
  OnInit
} from '@angular/core';
import { Movie } from '../../models/movie';
import { HomeService } from './home.service';
import { MovieType } from '../../models/movie-type.enum';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loading = true;
  public currentMovieType: MovieType;
  public movies$: Observable<Movie[]> = this._homeService.getMovies$().pipe(tap(() => {
    this.loading = false;
  }));

  constructor(private readonly _homeService: HomeService) {
    this.currentMovieType = _homeService.movieType;
  }

  setMovieType(movieType: MovieType) {
    this.loading = true;
    this._homeService.movieType = this.currentMovieType = movieType;
  }

  ngOnInit(): void {
  }
}
