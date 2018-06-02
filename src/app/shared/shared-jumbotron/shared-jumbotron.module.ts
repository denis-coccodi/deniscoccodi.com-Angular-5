import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedJumbotronModalComponent } from './shared-jumbotron-modal/shared-jumbotron-modal.component';
import { SharedJumbotronComponent } from './shared-jumbotron.component';
import { JumboAddrComponent } from './shared-jumbotron-modal/jumbotron-addresses/jumbotron-addresses.component';
import { EmailClientComponent } from './shared-jumbotron-modal/email-client/email-client.component';
import { CommonModule } from '@angular/common';
import { FrameLoadingComponent } from '../loading-components/frame-loading/frame-loading.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalModule } from 'ngx-bootstrap';
import { FooterComponent } from '../../footer/footer.component';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  declarations: [
    SharedJumbotronComponent,
    SharedJumbotronModalComponent,
    JumboAddrComponent,
    EmailClientComponent,
    FrameLoadingComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    ModalModule.forRoot(),
    UiSwitchModule
  ],
  providers: [
  ],
  exports: [
    SharedJumbotronComponent,
    FrameLoadingComponent,
    FooterComponent
  ]
})
export class SharedJumbotronModule {}
