import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card.component';
import { MovieCardFrontSideComponent } from './movie-card-front-side';
import {
  MovieCardBackSideComponent,
  MovieInfoGridComponent
} from './movie-card-back-side';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@movie-space/shared';


@NgModule({
  declarations: [
    MovieCardComponent,
    MovieCardBackSideComponent,
    MovieCardFrontSideComponent,
    MovieInfoGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    MovieCardComponent
  ]
})
export class MovieCardModule {
}
