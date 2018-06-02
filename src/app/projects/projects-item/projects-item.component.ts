import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../Models/project.model';
import { WindowSizeService } from '../../shared/services/window-size.service';
import { ProjectsService } from '../projects.service';
import { BrowserDetectorService } from '../../shared/services/browser-detector.service';

@Component({
  selector: 'app-projects-item',
  templateUrl: './projects-item.component.html',
  styleUrls: ['./projects-item.component.scss']
})
export class ProjectsItemComponent implements OnInit {
  @Input() project: Project;

  constructor(public windowSize: WindowSizeService,
              public projectsService: ProjectsService,
              public browserDetector: BrowserDetectorService) { }

  ngOnInit() {
  }
}
