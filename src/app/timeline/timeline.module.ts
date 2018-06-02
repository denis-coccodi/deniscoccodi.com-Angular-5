import { NgModule } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NouisliderModule } from 'ng2-nouislider';
import { TimelineComponent } from './timeline.component';
import { Ng2TimelineComponent } from './ng2-timeline/ng2-timeline.component';
import { TlItemComponent } from './tl-item/tl-item.component';
import { TlCertificatesComponent } from './tl-item/tl-certificates/tl-certificates.component';
import { TlCertificateComponent } from './tl-item/tl-certificates/tl-certificate/tl-certificate.component';
import { SliderComponent } from './slider/slider.component';
import { SharedModalModule } from '../shared/shared-modal.module';
import { CommonModule } from '@angular/common';
import { SharedJumbotronModule } from '../shared/shared-jumbotron/shared-jumbotron.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { DataRetrieverModule } from '../shared/data-retriever.module';
import { CollapseModule } from 'ngx-bootstrap';
import { TimelineRoutingModule } from './timeline-routing.module';

@NgModule({
  declarations: [
    TimelineComponent,
    Ng2TimelineComponent,
    TlItemComponent,
    TlCertificatesComponent,
    TlCertificateComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    TimelineRoutingModule,
    CollapseModule.forRoot(),
    SharedJumbotronModule,
    Ng2GoogleChartsModule,
    NouisliderModule,
    PipesModule,
    DataRetrieverModule,
    SharedModalModule
  ],
  providers: [
  ],
  exports: [
  ]
})
export class TimelineModule {}
