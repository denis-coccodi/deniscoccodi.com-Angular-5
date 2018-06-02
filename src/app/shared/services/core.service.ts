import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router, RoutesRecognized } from '@angular/router';

@Injectable()
export class CoreService {
  private _lang = 'ita';
  public langUpdated = new Subject<string>();

  // get language from url
  constructor(private _router: Router) {
    this._router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        this._lang = (val.state.root.firstChild.params['lang'] === 'en') ? 'eng' : 'ita';
        this.langUpdated.next(this._lang);
      }
    });
  }

  // change language and notify the change
  setLang(lang: string) {
    this._lang = lang;
    this._router.navigate([this._setUpPath(lang)], { queryParamsHandling: 'merge' });
    this.langUpdated.next(this._lang);
  }

  getLang() {
    return this._lang;
  }

  // get the url, and return only what is after the website name in an array of strings
  getCurrentRouteAsArray() {
    let routeArray: string[] = [];
    routeArray = window.location.href.split('/');
    routeArray.splice(0, 3);

    return routeArray;
  }

  // remove first element as it's empty, and any eventual query parameter present at the end
  private _setUpPath(lang: string): string {
    let splitPath: string[];
    splitPath = this._router.url.split('/');
    splitPath.splice(0, 1);
    splitPath[0] = lang.substring(0, 2);
    const sPathLastIndex = splitPath.length - 1;
    if (splitPath[sPathLastIndex].indexOf('?') > -1) {
      splitPath[sPathLastIndex] = splitPath[sPathLastIndex].substr(0, splitPath[sPathLastIndex].indexOf('?'));
    }
    return this.pathFromStringArray(splitPath);
  }

  // return path string from array of folder names
  pathFromStringArray(stringArray: string[]): string {
    let i = 0, composedString = '';
    while (i < stringArray.length) { composedString += stringArray[i] + '/'; i++; }
    composedString = composedString.substring(0, composedString.length - 1);
    return composedString;
  }

}
