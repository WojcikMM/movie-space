import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieSearchComponent } from './movie-search';
import { MovieListComponent } from './movie-list.component';
import { MovieCardModule } from './movie-card/movie-card.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GenreFiltersComponent } from './genre-filters';
import { SharedModule } from '@movie-space/shared';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromMovies from './+state/movies/movies.reducer';
import { MoviesEffects } from './+state/movies/movies.effects';
import { MoviesFacade } from './+state/movies/movies.facade';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieSearchComponent,
    GenreFiltersComponent,
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
        component: MovieListComponent,
      },
    ]),
    StoreModule.forFeature(fromMovies.MOVIES_FEATURE_KEY, fromMovies.reducer),
    EffectsModule.forFeature([MoviesEffects]),
  ],
  providers: [MoviesFacade],
})
export class MovieListModule {}
