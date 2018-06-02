import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { CoreService } from '../shared/services/core.service';
import { HeaderLink } from './header-link.model';
import { WindowSizeService } from '../shared/services/window-size.service';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('flagsOpacity', [
      state('flagsOpacityStart', style({ opacity: 0 })),
      state('flagsOpacityEnd', style({ opacity: 1 })),
      transition('flagsOpacityStart <=> flagsOpacityEnd', animate('500ms')),
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerLinks: HeaderLink[];
  langSubscription: Subscription;
  isNavbarCollapsed = true;
  flagsOpacityState: string;

  constructor(
    public coreService: CoreService,
    public windowSize: WindowSizeService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.flagsOpacityState = 'flagsOpacityStart';
    this.setHeaderLinks();
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getHeaderLinks() {
    return this.headerLinks;
  }

  // get url length after the domain adddress
  getCurrentPathLength() {
    return this._router.url.split('/').length - 1;
  }

  setHeaderLinks() {
    this.langSubscription = this.coreService.langUpdated.subscribe(
      (lang: string) => {
        switch (lang) {
          case 'eng':
            this.headerLinks = [];
            this.headerLinks.push(new HeaderLink('fa-bookmark', 'biography', 'en/biography'));
            this.headerLinks.push(new HeaderLink('fa-newspaper-o', 'resume', 'en/cv'));
            this.headerLinks.push(new HeaderLink('fa-line-chart', 'timeline', 'en/timeline'));
            this.headerLinks.push(new HeaderLink('fa-code-fork', 'projects', 'en/projects'));
            // this.headerLinks.push(new HeaderLink('', 'about', 'en/about'));
            break;
          case 'ita':
            this.headerLinks = [];
            this.headerLinks.push(new HeaderLink('fa-bookmark', 'biografia', 'it/biography'));
            this.headerLinks.push(new HeaderLink('fa-newspaper-o', 'curriculum', 'it/cv'));
            this.headerLinks.push(new HeaderLink('fa-line-chart', 'storico', 'it/timeline'));
            this.headerLinks.push(new HeaderLink('fa-code-fork', 'progetti', 'it/projects'));
            // this.headerLinks.push(new HeaderLink('', 'info', 'it/about'));
            break;
          default:
            this.headerLinks = [];
            this.headerLinks.push(new HeaderLink('fa-bookmark', 'biografia', 'it/biography'));
            this.headerLinks.push(new HeaderLink('fa-newspaper-o', 'curriculum', 'it/cv'));
            this.headerLinks.push(new HeaderLink('fa-line-chart', 'storico', 'it/timeline'));
            this.headerLinks.push(new HeaderLink('fa-code-fork', 'progetti', 'it/projects'));
            // this.headerLinks.push(new HeaderLink('', 'info', 'it/about'));
            break;
        }
      }
    );
  }

  showFlags() {
    if (this.flagsOpacityState === 'flagsOpacityStart') {
      this.flagsOpacityState = 'flagsOpacityEnd';
    } else {
      this.flagsOpacityState = 'flagsOpacityStart';
    }
  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }
}
