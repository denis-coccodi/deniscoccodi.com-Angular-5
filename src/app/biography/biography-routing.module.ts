import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BiographyComponent } from './biography/biography.component';

const biographyRoutes: Routes = [
  {path: '', component: BiographyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(biographyRoutes)],
  exports: [RouterModule]
})

export class BiographyRoutingModule {

}
