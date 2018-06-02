import { Component, Input, OnInit } from '@angular/core';
import { Occurrence } from '../../shared/models/occurrence.model';
import { WindowSizeService } from '../../shared/services/window-size.service';
import { CoreService } from '../../shared/services/core.service';
import { Residence } from '../residence.model';

@Component({
  selector: 'app-tl-item',
  templateUrl: './tl-item.component.html',
  styleUrls: ['./tl-item.component.scss']
})
export class TlItemComponent implements OnInit {
  @Input() categoryName: string;
  @Input() occurrence: Occurrence;
  @Input() residence: Residence;

  constructor(
    public windowSize: WindowSizeService,
    public coreService: CoreService
  ) { }

  ngOnInit() {}

}
