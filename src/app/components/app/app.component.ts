import { Component } from '@angular/core';
import { MovieDiscoverService } from '../../services/movie-discover.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieDiscoverService]
})
export class AppComponent {
  logoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj4xG0xzHVKjQdvDjhExHyEM8wa9oF3RBhAoKK5qcWTFrD5B0H';
  constructor() { }
}
