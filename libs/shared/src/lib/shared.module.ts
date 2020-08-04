import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from './controls/controls.module';
import { ServicesModule } from './services/services.module';

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
export class SharedModule {}
