import { Component, Input } from '@angular/core';
import { GenreEntity } from '../../models';

@Component({
  selector: 'shared-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent {

  @Input()
  genres: GenreEntity[];
}
