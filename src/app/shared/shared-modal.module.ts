import { NgModule } from '@angular/core';
import { CarouselModule, ModalModule } from 'ngx-bootstrap';
import { SharedModalComponent } from './shared-modal/shared-modal.component';
import { SharedCarouselComponent } from './shared-modal/shared-carousel/shared-carousel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SharedModalComponent,
    SharedCarouselComponent
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
  ],
  exports: [
    SharedModalComponent
  ]
})
export class SharedModalModule {}
