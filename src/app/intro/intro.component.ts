import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  animations: [
    trigger('frameOpacity', [
      state('frameOpacityStart', style({ transform: 'translate(0, -165%) rotate3d(0, 1, 0, -90deg)', opacity: 1 })),
      state('frameOpacityEnd', style({ transform: 'translate(0, -165%) rotate3d(0, 1, 0, 0deg)', opacity: 1 })),
      transition('* => frameOpacityEnd', animate('150ms ease-out')),
    ]),
    trigger('picOpacity', [
      state('picOpacityStart', style({ opacity: 0 })),
      state('picOpacityEnd', style({ opacity: 1 })),
      transition('* => picOpacityEnd', animate('1000ms 1000ms ease-out')),
    ]),
    trigger('brandOpacity', [
      state('brandOpacityStart', style({ opacity: 0 })),
      state('brandOpacityEnd', style({ opacity: 1 })),
      transition('brandOpacityStart => brandOpacityEnd', animate('800ms 800ms')),
    ]),
    trigger('bgOpacity', [
      state('bgOpacityStart', style({ opacity: 0 })),
      state('bgOpacityEnd', style({ opacity: 1 })),
      transition('bgOpacityStart => bgOpacityEnd', animate('800ms ease-out')),
    ]),
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, display: 'none'})),
      transition('shown => hidden', animate('500ms 300ms')),
    ])
  ]
})

export class IntroComponent implements OnInit {
  frameOpacityState: string[];
  picOpacityState: string[];
  brandOpacityState: string;
  bgOpacityState: string;
  visibilityState: string;
  polaroidCount: number[];
  polaroidNumber = 20;
  private timerSubscription: Subscription;

  constructor(private router: Router) { }

  // set polaroid frame opacity timer and initialize arrays and animations
  ngOnInit() {
    this.polaroidCount = Array.from(Array(this.polaroidNumber).keys());
    this.frameOpacityState = Array.from(Array(this.polaroidNumber).fill('frameOpacityStart'));
    this.picOpacityState = Array.from(Array(this.polaroidNumber).fill('picOpacityStart'));
    this.brandOpacityState = 'brandOpacityStart';
    this.bgOpacityState = 'bgOpacityStart';
    this.visibilityState = 'shown';
    const timer = Observable.timer(1000, 100);
    this.timerSubscription = timer.subscribe((t) => {
      if (t === 1) { this.bgOpacityState = 'bgOpacityEnd'; }
      this.frameOpacityState[t] = 'frameOpacityEnd';
      if (t === this.polaroidNumber - 1) { this.timerSubscription.unsubscribe(); }
    });
  }

  // frame opacity done callback
  startPicOpacity(e, index: number) {
    if (e.toState === 'frameOpacityEnd') {
      this.picOpacityState[index] = 'picOpacityEnd';
      if (index === this.polaroidNumber - 1) {
        this.brandOpacityState = 'brandOpacityEnd';
      }
    }
  }

  // animation finished callback
  changeVisibility(e) {
    if (e.toState === 'brandOpacityEnd') { this.visibilityState = 'hidden'; }
  }

  // redirect to a different page after fade out callback
  redirectHome(e) {
    if (e.toState === 'hidden') { this.router.navigate(['it/biography'], {queryParamsHandling: 'merge'}); }
  }
}
