import { Component, OnInit } from '@angular/core';
import { PageLoadingService } from './page-loading.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-page-loading',
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, display: 'none'})),
      transition('shown => hidden', animate('600ms')),
    ])
  ]
})
export class PageLoadingComponent implements OnInit {
  public visible = false;
  public isSquare = false;
  public visiblityState = 'hidden';

  constructor(public loadingService: PageLoadingService) { }

  ngOnInit() {
    this.loadingService.visibilityChange.subscribe(
      (response) => {
        this.visible = response.visible;
        this.isSquare = response.isSquare;
        this._setVisibilityState(this.visible);
      }
    );
  }

  private _setVisibilityState(isShown: boolean) {
    if (isShown) {
      this.visiblityState = 'shown';
    } else {
      this.visiblityState = 'hidden';
    }
  }
}
