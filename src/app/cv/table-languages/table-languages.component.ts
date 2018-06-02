import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../shared/services/core.service';
import { WindowSizeService } from '../../shared/services/window-size.service';

@Component({
  selector: 'app-table-languages',
  templateUrl: './table-languages.component.html',
  styleUrls: ['./table-languages.component.scss']
})
export class TableLanguagesComponent implements OnInit {

  constructor(
    public coreService: CoreService,
    public windowSize: WindowSizeService
  ) { }

  ngOnInit() {
  }

}
