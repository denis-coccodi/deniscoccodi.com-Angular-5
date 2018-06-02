import { NgModule } from '@angular/core';
import { AccordionModule, CarouselModule, CollapseModule } from 'ngx-bootstrap';
import { CvComponent } from './cv.component';
import { CvItemComponent } from './cv-item/cv-item.component';
import { CertificatesComponent } from './cv-item/certificates/certificates.component';
import { CertificateComponent } from './cv-item/certificates/certificate/certificate.component';
import { TableLanguagesComponent } from './table-languages/table-languages.component';
import { TableDigitalComponent } from './table-digital/table-digital.component';
import { SharedModalModule } from '../shared/shared-modal.module';
import { CommonModule } from '@angular/common';
import { SharedJumbotronModule } from '../shared/shared-jumbotron/shared-jumbotron.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { DataRetrieverModule } from '../shared/data-retriever.module';
import { CvRoutingModule } from './cv-routing.module';

@NgModule({
  declarations: [
    CvComponent,
    CvItemComponent,
    CertificatesComponent,
    CertificateComponent,
    TableLanguagesComponent,
    TableDigitalComponent
  ],
  imports: [
    CommonModule,
    CvRoutingModule,
    SharedJumbotronModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    PipesModule,
    DataRetrieverModule,
    SharedModalModule
  ],
  providers: [
  ],
  exports: [
  ]
})
export class CvModule {}
