import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SharedJumbotronService } from '../shared-jumbotron.service';

@Component({
  selector: 'app-shared-jumbotron-modal',
  templateUrl: './shared-jumbotron-modal.component.html',
  styleUrls: ['./shared-jumbotron-modal.component.scss']
})
export class SharedJumbotronModalComponent implements OnInit {
  @ViewChild('jumboModalTempRef') modalTempRef: TemplateRef<any>;

  constructor(public sharedJumbotronService: SharedJumbotronService) { }

  ngOnInit() {
    this.sharedJumbotronService.setModalTemplateRef(this.modalTempRef);
  }

}
