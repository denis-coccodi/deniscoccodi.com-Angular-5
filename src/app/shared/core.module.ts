import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from '../header/header.component';
import { PageLoadingService } from './loading-components/page-loading/page-loading.service';
import { ProjectsService } from '../projects/projects.service';
import { TimelineService } from '../timeline/timeline.service';
import { EmailClientService } from './shared-jumbotron/shared-jumbotron-modal/email-client/email-client.service';
import { SharedJumbotronService } from './shared-jumbotron/shared-jumbotron.service';
import { CvImagesService } from './shared-modal/cv-images.service';
import { CvDataHandlerService } from './services/cv-data-handler.service';
import { WindowSizeService } from './services/window-size.service';
import { CoreService } from './services/core.service';
import { DataRetrieverService } from './services/data-retriever.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loading-components/page-loading/loadingInterceptor.interceptor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageLoadingComponent } from './loading-components/page-loading/page-loading.component';
import { InfoComponent } from '../info/info.component';
import { CollapseModule } from 'ngx-bootstrap';
import { BrowserDetectorService } from './services/browser-detector.service';

@NgModule({
  declarations: [
    HeaderComponent,
    PageLoadingComponent,
    InfoComponent
  ],
  imports: [
    AppRoutingModule,
    AngularFontAwesomeModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    DataRetrieverService,
    CoreService,
    WindowSizeService,
    CvDataHandlerService,
    CvImagesService,
    SharedJumbotronService,
    EmailClientService,
    TimelineService,
    ProjectsService,
    PageLoadingService,
    BrowserDetectorService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  exports: [
    AppRoutingModule,
    PageLoadingComponent,
    HeaderComponent
  ]
})
export class CoreModule {}
