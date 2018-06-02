import { Component, Input, OnInit } from '@angular/core';
import { Occurrence } from '../../shared/models/occurrence.model';
import { Category } from '../../shared/models/category.model';
import { WindowSizeService } from '../../shared/services/window-size.service';
import { CoreService } from '../../shared/services/core.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cv-item',
  templateUrl: './cv-item.component.html',
  styleUrls: ['./cv-item.component.scss']
})
export class CvItemComponent implements OnInit {
  @Input() category: Category;
  @Input() occurrence: Occurrence;

  constructor(
    public windowSize: WindowSizeService,
    public coreService: CoreService
  ) { }

  ngOnInit() {}

}
