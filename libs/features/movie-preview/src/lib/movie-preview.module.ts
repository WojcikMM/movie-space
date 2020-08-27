import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@movie-space/shared';
import { MoviePreviewComponent } from './movie-preview.component';
import { MoviePreviewResolverService } from './movie-preview-resolver.service';


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
        component: MoviePreviewComponent,
        resolve: {
          data: MoviePreviewResolverService
        }
      }
    ])
  ]
})
export class MoviePreviewModule {
}
