import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects.component';
import { ProjectsRecursionComponent } from './projects-item/projects-recursion/projects-recursion.component';
import { ProjectsItemComponent } from './projects-item/projects-item.component';
import { CommonModule } from '@angular/common';
import { SharedJumbotronModule } from '../shared/shared-jumbotron/shared-jumbotron.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { DataRetrieverModule } from '../shared/data-retriever.module';
import { CollapseModule, ModalModule } from 'ngx-bootstrap';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsModalComponent } from './projects-modal/projects-modal.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsItemComponent,
    ProjectsRecursionComponent,
    ProjectsModalComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    SharedJumbotronModule,
    PipesModule,
    DataRetrieverModule
  ],
  providers: [
  ],
  exports: [
  ]
})
export class ProjectsModule {}
