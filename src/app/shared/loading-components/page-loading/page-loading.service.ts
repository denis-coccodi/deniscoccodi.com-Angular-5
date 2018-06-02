import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PageLoadingService {
  private _visible: boolean;
  visibilityChange = new Subject<{visible: boolean, isSquare: boolean}>();

  constructor() { }

  show(isSquare?: boolean) {
    if (!isSquare) { isSquare = false; }
    this._visible = true;
    const object = {visible: this._visible, isSquare: isSquare};
    this.visibilityChange.next(object);
  }

  hide(isSquare?: boolean) {
    if (!isSquare) { isSquare = false; }
    this._visible = false;
    const object = {visible: this._visible, isSquare: isSquare};
    this.visibilityChange.next(object);
  }

  isVisible() {
    return this._visible;
  }

}
