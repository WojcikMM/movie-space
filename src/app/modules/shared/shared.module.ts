import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from './services/services.module';
import { ControlsModule } from './controls/controls.module';


@NgModule({
  imports: [
    CommonModule,
    ServicesModule,
    ControlsModule
  ],
  exports: [
    ControlsModule
  ]
})
export class SharedModule {
}
