import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from '../../../shared/services/core.service';
import { Occurrence } from '../../../shared/models/occurrence.model';
import { Category } from '../../../shared/models/category.model';
import { CvImagesService } from '../../../shared/shared-modal/cv-images.service';

@Component({
  selector: 'app-tl-certificates',
  templateUrl: './tl-certificates.component.html',
  styleUrls: ['./tl-certificates.component.scss']
})
export class TlCertificatesComponent implements OnInit {
  @Input() occurrenceRef: Occurrence;
  @Input() categoryName: Category;
  public isCollapsed = true;

  constructor(
    public coreService: CoreService,
    public cvImagesService: CvImagesService
  ) { }

  ngOnInit() {
  }

}
