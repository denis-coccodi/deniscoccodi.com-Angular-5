import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-frame-loading',
  templateUrl: './frame-loading.component.html',
  styleUrls: ['./frame-loading.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, display: 'none'})),
      transition('shown => hidden', animate('300ms')),
    ])
  ]
})
export class FrameLoadingComponent implements OnInit {
  @Input() visiblityState: string;

  constructor() { }

  ngOnInit() {
  }
}
