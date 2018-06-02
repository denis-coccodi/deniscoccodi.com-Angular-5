import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { InfoComponent } from './info/info.component';
import { IntroComponent } from './intro/intro.component';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', component: IntroComponent },
  { path: ':lang', component: IntroComponent },
  { path: ':lang/biography', loadChildren: './biography/biography.module#BiographyModule' },
  { path: ':lang/cv', loadChildren: './cv/cv.module#CvModule' },
  { path: ':lang/timeline', loadChildren: './timeline/timeline.module#TimelineModule' },
  { path: ':lang/projects', loadChildren: './projects/projects.module#ProjectsModule' },
  { path: ':lang/about', component: InfoComponent },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
