import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollComponent } from './infinite-scroll';


@NgModule({
  declarations: [
    InfiniteScrollComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InfiniteScrollComponent
  ]
})
export class ControlsModule {
}
