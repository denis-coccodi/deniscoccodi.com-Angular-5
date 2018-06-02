import { Component, OnInit } from '@angular/core';
import { WindowSizeService } from '../../shared/services/window-size.service';
import { CoreService } from '../../shared/services/core.service';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})

export class BiographyComponent implements OnInit {

  constructor(
    public windowSizeService: WindowSizeService,
    public coreService: CoreService
  ) {}

  ngOnInit() {
  }
}
