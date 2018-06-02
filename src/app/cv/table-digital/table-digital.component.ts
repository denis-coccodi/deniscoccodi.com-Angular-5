import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../shared/services/core.service';
import { WindowSizeService } from '../../shared/services/window-size.service';

@Component({
  selector: 'app-table-digital',
  templateUrl: './table-digital.component.html',
  styleUrls: ['./table-digital.component.scss']
})
export class TableDigitalComponent implements OnInit {

  constructor(
    public coreService: CoreService,
    public windowSize: WindowSizeService
  ) { }

  ngOnInit() {
  }

}
