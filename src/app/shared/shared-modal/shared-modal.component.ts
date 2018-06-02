import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CvImagesService } from './cv-images.service';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss']
})
export class SharedModalComponent implements OnInit {
  @ViewChild('modalTempRef') modalTempRef: TemplateRef<any>;

  constructor(
    public cvImgModalService: CvImagesService
  ) { }

  ngOnInit() {
    this.cvImgModalService.setModalTemplateRef(this.modalTempRef);
  }

}
