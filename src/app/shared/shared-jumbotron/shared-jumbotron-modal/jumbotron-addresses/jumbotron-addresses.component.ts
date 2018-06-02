import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { SharedJumbotronService } from '../../shared-jumbotron.service';

@Component({
  selector: 'app-jumbotron-addresses',
  templateUrl: './jumbotron-addresses.component.html',
  styleUrls: ['./jumbotron-addresses.component.scss']
})
export class JumboAddrComponent implements OnInit {
  public frameLoadingState = 'shown';

  constructor(public sharedJumbotronService: SharedJumbotronService) { }

  ngOnInit() {
  }

  onIframeLoad() {
    this.frameLoadingState = 'hidden';
  }
}
