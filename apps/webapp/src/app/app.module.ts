import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  SharedModule,
  GLOBAL_CONST,
  NotFoundComponent
} from '@movie-space/shared';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: GLOBAL_CONST.ROUTES.LIST,
        pathMatch: 'full'
      },
      {
        path: GLOBAL_CONST.ROUTES.LIST,
        loadChildren: () => import('@movie-space/features/movie-list').then(module => module.MovieListModule)
      },
      {
        path: GLOBAL_CONST.ROUTES.PREVIEW,
        loadChildren: () => import('@movie-space/features/movie-preview').then(module => module.MoviePreviewModule)
      },
      {path: '**', component: NotFoundComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
