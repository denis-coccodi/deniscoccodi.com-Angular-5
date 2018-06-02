import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimelineService } from './timeline.service';
import { Occurrence } from '../shared/models/occurrence.model';
import { Subscription } from 'rxjs/Subscription';
import {WindowSizeService} from '../shared/services/window-size.service';
import {CoreService} from '../shared/services/core.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
  private _tlItemVisible = false;
  private _selectedCategoryName: string;
  private _selectedOccurrenceRef: Occurrence;
  private _selectedResidenceRef: Occurrence;
  private _clickedItemEventSub: Subscription;
  private _chartReadySubscription: Subscription;
  public chartReady = false;
  public frameLoadingState = 'shown';

  constructor(
    private _timelineService: TimelineService,
    public windowSize: WindowSizeService,
    public coreService: CoreService
  ) {}

  ngOnInit() {
    this._clickedItemEventSub = this._timelineService.clickedItemEvent.subscribe(
      (clickedItem) => {
        if (clickedItem.categoryName !== 'residence') {
          this._selectedResidenceRef = undefined;
          this._selectedCategoryName = clickedItem.categoryName;
          this._selectedOccurrenceRef = clickedItem.occurrenceRef;
          this._tlItemVisible = true;
        } else {
          this._selectedCategoryName = clickedItem.categoryName;
          this._selectedOccurrenceRef = undefined;
          this._selectedResidenceRef = clickedItem.residenceRef;
          this._tlItemVisible = true;
        }
      }
    );
    this._chartReadySubscription = this._timelineService.chartReady.subscribe(
      (isReady: boolean) => {
        this.chartReady = isReady;
        if (isReady) { this.frameLoadingState = 'hidden'; }
      }
    );
  }

  getSelectedCategoryName(): string {
    return this._selectedCategoryName;
  }

  getSelectedOccurrenceRef(): Occurrence {
    return this._selectedOccurrenceRef;
  }

  getSelectedResidenceRef(): Occurrence {
    return this._selectedResidenceRef;
  }

  getTlItemVisible() {
    return this._tlItemVisible;
  }

  ngOnDestroy() {
    this._clickedItemEventSub.unsubscribe();
    this._chartReadySubscription.unsubscribe();
  }
}
