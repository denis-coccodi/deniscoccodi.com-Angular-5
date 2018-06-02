import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects.component';

const projectsRoutes: Routes = [
  {path: '', component: ProjectsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes)],
  exports: [RouterModule]
})

export class ProjectsRoutingModule {

}
