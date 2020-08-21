import { Component } from '@angular/core';
import { GenresFacade } from '@movie-space/shared';

@Component({
  selector: 'movie-space-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(genresFacade: GenresFacade) {
    genresFacade.loadGenres();
  }

}
