import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreService } from '../shared/services/core.service';
import { Subscription } from 'rxjs/Subscription';
import { ProjectsService } from './projects.service';
import { Project } from './Models/project.model';
import { WindowSizeService } from '../shared/services/window-size.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private _projects: Project[];
  projReadySubscription: Subscription;

  constructor(
    public coreService: CoreService,
    public windowSize: WindowSizeService,
    private _projectsService: ProjectsService
  ) { }

  // retrieve project data from server unless already cached
  ngOnInit() {
    this.projReadySubscription = this._projectsService.getProjectsAsync.subscribe(
      (projects: Project[]) => {
        this._projects = projects;
      });
    if (this._projectsService.isProjects()) {
      this._projects = this._projectsService.getProjects();
    }
  }

  getProjects() {
    return this._projects;
  }

  ngOnDestroy() {
    this.projReadySubscription.unsubscribe();
  }

}
