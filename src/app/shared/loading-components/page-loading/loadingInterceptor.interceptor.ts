import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { PageLoadingService } from './page-loading.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private _loadingService: PageLoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._loadingService.show();

    return next.handle(req).do(
      (event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {
          this._loadingService.hide();
        }
      }, (err: any) => {
        this._loadingService.hide();
      }
    );
  }
}
