import { Component, OnInit } from '@angular/core';
import { WindowSizeService } from './shared/services/window-size.service';
import { CoreService } from './shared/services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public windowSize: WindowSizeService,
    public coreService: CoreService
  ) {}

  ngOnInit() {
  }
}
