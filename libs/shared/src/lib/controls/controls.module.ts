import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader';
import { HeaderComponent } from './header';
import { NotFoundComponent } from './not-found';
import { InfiniteScrollComponent } from './infinite-scroll';
import { GenreListComponent } from './genre-list/genre-list.component';


@NgModule({
  declarations: [
    InfiniteScrollComponent,
    LoaderComponent,
    HeaderComponent,
    NotFoundComponent,
    GenreListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    InfiniteScrollComponent,
    LoaderComponent,
    HeaderComponent,
    NotFoundComponent,
    GenreListComponent
  ]
})
export class ControlsModule {
}
