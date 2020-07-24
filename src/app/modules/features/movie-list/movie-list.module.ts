import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieSearchComponent } from './movie-search';
import { MovieListComponent } from './movie-list.component';
import { MovieCardModule } from './movie-card/movie-card.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GenreFiltersComponent } from './genre-filters';
import { SharedModule } from '../../shared';


@NgModule({
  declarations: [
    MovieListComponent,
    MovieSearchComponent,
    GenreFiltersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MovieCardModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: MovieListComponent
      }
    ])
  ]
})
export class MovieListModule {
}
