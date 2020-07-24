import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviePreviewComponent } from './movie-preview.component';
import { SharedModule } from '../../shared';


@NgModule({
  declarations: [
    MoviePreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: ':id',
        pathMatch: 'full',
        component: MoviePreviewComponent
      }
    ])
  ]
})
export class MoviePreviewModule {
}
