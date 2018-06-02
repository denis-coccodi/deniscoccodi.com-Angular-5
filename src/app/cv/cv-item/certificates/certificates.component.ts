import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from '../../../shared/services/core.service';
import { Occurrence } from '../../../shared/models/occurrence.model';
import { Category } from '../../../shared/models/category.model';
import { CvImagesService } from '../../../shared/shared-modal/cv-images.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  @Input() occurrenceRef: Occurrence;
  @Input() categoryRef: Category;
  public isCollapsed = true;

  constructor(
    public coreService: CoreService,
    public cvPicModService: CvImagesService
  ) { }

  ngOnInit() {
  }

}
