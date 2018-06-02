import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CoreService } from '../shared/services/core.service';
import { WindowSizeService } from '../shared/services/window-size.service';
import { Subscription } from 'rxjs/Subscription';
import { CvDataHandlerService } from '../shared/services/cv-data-handler.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit, OnDestroy {
  private _categories: Category[] = null;
  catReadySubscription: Subscription;
  status: any = {
    isFirstOpen: true,
    isOpen: true
  };

  constructor(
    private _cvDataHandler: CvDataHandlerService,
    public coreService: CoreService,
    public windowSize: WindowSizeService
  ) {}

  // subscribes for asynchronous data collection from cvData/LangChange
  // data gets retrieved from the server only once in the whole project
  ngOnInit() {
    this.catReadySubscription = this._cvDataHandler.getCategoriesAsync.subscribe(
      (categories: Category[]) => {
        this._categories = categories;
    });
    if (this._cvDataHandler.isCategories()) {
      this._categories = this._cvDataHandler.getCategories();
    }
  }

  // public method for private variable
  getCategories() {
    return this._categories;
  }

  // free memory from subscriptions on component destruction
  ngOnDestroy() {
    this.catReadySubscription.unsubscribe();
  }
}
