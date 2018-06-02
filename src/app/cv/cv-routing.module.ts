import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CvComponent } from './cv.component';

const cvRoutes: Routes = [
  {path: '', component: CvComponent}
];

@NgModule({
  imports: [RouterModule.forChild(cvRoutes)],
  exports: [RouterModule]
})

export class CvRoutingModule {

}
