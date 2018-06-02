import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { FutureToTodayPipe } from './future-to-today.pipe';
import { SanitizerPipe } from './sanitizer.pipe';

@NgModule({
  declarations: [
    FutureToTodayPipe,
    CapitalizePipe,
    SanitizerPipe
  ],
  imports: [
  ],
  providers: [
  ],
  exports: [
    FutureToTodayPipe,
    CapitalizePipe,
    SanitizerPipe
  ]
})
export class PipesModule {}
