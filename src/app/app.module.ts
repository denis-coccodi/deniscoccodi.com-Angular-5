import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { CoreModule } from './shared/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedJumbotronModule } from './shared/shared-jumbotron/shared-jumbotron.module';
import { CvModule } from './cv/cv.module';
import { TimelineModule } from './timeline/timeline.module';
import { ProjectsModule } from './projects/projects.module';
import { DataRetrieverModule } from './shared/data-retriever.module';
import { BiographyModule } from './biography/biography.module';
import { IntroComponent } from './intro/intro.component';

registerLocaleData(localeIt, 'it');

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BiographyModule,
    SharedJumbotronModule,
    CvModule,
    TimelineModule,
    ProjectsModule,
    DataRetrieverModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
