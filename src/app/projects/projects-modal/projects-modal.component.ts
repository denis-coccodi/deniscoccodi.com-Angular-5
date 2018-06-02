import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-modal',
  templateUrl: './projects-modal.component.html',
  styleUrls: ['./projects-modal.component.scss']
})
export class ProjectsModalComponent implements OnInit {
  @ViewChild('projModalRef') projModalRef: TemplateRef<any>;

  constructor(public projectsService: ProjectsService) {
  }

  ngOnInit() {
    this.projectsService.setModalTemplateRef(this.projModalRef);
  }

}
