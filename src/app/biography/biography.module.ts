import { NgModule } from '@angular/core';
import { BiographyComponent } from './biography/biography.component';
import { CommonModule } from '@angular/common';
import { BiographyRoutingModule } from './biography-routing.module';

@NgModule({
  declarations: [
    BiographyComponent
  ],
  imports: [
    CommonModule,
    BiographyRoutingModule
  ],
  providers: [
  ],
  exports: [
  ]
})
export class BiographyModule {}
