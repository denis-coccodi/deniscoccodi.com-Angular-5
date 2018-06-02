import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class WindowSizeService {
  private _innerHeight: any;
  private _innerWidth: any;
  private _currentSize: string;

  public sizeChanged = new Subject<string>();


  // set current bootstrap screen size on object creation
  constructor() {
    this.onResize();
  }

  // set current bootstrap screen size when called
  onResize() {
    this._innerHeight = window.innerHeight;
    this._innerWidth = window.innerWidth;
    // xs -> Portrait Phones
    if (this._innerWidth < 576) {
      this._currentSize = 'xs';
      this._screenSizeChanged(this._currentSize);
    }
    // sm -> Landscape Phones
    if (this._innerWidth >= 576 && this._innerWidth < 768) {
      this._currentSize = 'sm';
      this._screenSizeChanged(this._currentSize);
    }
    // md -> Tablets
    if (this._innerWidth >= 768 && this._innerWidth < 992) {
      this._currentSize = 'md';
      this._screenSizeChanged(this._currentSize);
    }
    // lg -> Smaller Desktops
    if (this._innerWidth >= 992 && this._innerWidth < 1200) {
      this._currentSize = 'lg';
      this._screenSizeChanged(this._currentSize);
    }
    // xl -> Larger Desktops
    if (this._innerWidth >= 1200) {
      this._currentSize = 'xl';
      this._screenSizeChanged(this._currentSize);
    }
  }

  // return current bootstrap size of the window
  getCurrentSize(): string {
    return this._currentSize;
  }

  // return true if window width is larger than 991px
  isDesktopSize(): boolean {
    return this._currentSize === 'lg' || this._currentSize === 'xl' ? true : false;
  }

  // return inner window height
  getHeight()  {
    return this._innerHeight;
  }

  // send an event when called
  private _screenSizeChanged(newSize: string) {
    this.sizeChanged.next(newSize);
  }
}

