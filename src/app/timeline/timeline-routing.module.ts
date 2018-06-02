import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TimelineComponent } from './timeline.component';

const timelineRoutes: Routes = [
  {path: '', component: TimelineComponent},
];

@NgModule({
  imports: [RouterModule.forChild(timelineRoutes)],
  exports: [RouterModule]
})

export class TimelineRoutingModule {

}
