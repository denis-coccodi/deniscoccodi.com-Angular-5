import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs/Subscription';
import { WindowSizeService } from '../../shared/services/window-size.service';
import { ChartSelectEvent} from 'ng2-google-charts';
import { TimelineService } from '../timeline.service';
import { CvDataHandlerService } from '../../shared/services/cv-data-handler.service';
import { CoreService } from '../../shared/services/core.service';

@Component({
  selector: 'app-ng2-timeline',
  templateUrl: './ng2-timeline.component.html',
  styleUrls: ['./ng2-timeline.component.scss']
})
export class Ng2TimelineComponent implements OnInit, OnDestroy {
  private _categories: Category[] = null;
  private _residences: any = null;
  catReadySubscription: Subscription;
  resReadySubscription: Subscription;
  minDateChangedSubscription: Subscription;
  maxDateChangedSubscription: Subscription;
  sizeChangedSubscription: Subscription;
  private _currentSize = '';
  public timelineData: any;
  public displayError = false;

  constructor(
    public windowSize: WindowSizeService,
    private _timelineService: TimelineService,
    private _cvDataHandler: CvDataHandlerService,
    public coreService: CoreService
  ) { }

  // subscribes for asynchronous data collection from cvData/residenceData/LangChange, min/max date change, and window Size Change
  // data gets retrieved from the server only once in the whole project
  ngOnInit() {
    this._currentSize = this.windowSize.getCurrentSize();

    this.catReadySubscription = this._cvDataHandler.getCategoriesAsync.subscribe(
      (categories: Category[]) => {
        this._categories = categories;
        if (this._residences) {
          this._loadTimelineData();
        }
    });
    if (this._cvDataHandler.isResidences() && this._cvDataHandler.isCategories()) {
      this._categories = this._cvDataHandler.getCategories();
    }

    this.resReadySubscription = this._cvDataHandler.getResidencesAsync.subscribe(
      (residences: any) => {
        this._residences = residences;
        if (this._categories) {
          this._loadTimelineData();
        }
      });
    if (this._cvDataHandler.isResidences() && this._cvDataHandler.isCategories()) {
      this._residences = this._cvDataHandler.getResidences();
      this._loadTimelineData();
    }

    this.minDateChangedSubscription = this._timelineService.minDateChanged.subscribe(
      () => {
        this._loadTimelineData();
      }
    );

    this.maxDateChangedSubscription = this._timelineService.maxDateChanged.subscribe(
      () => {
        this._loadTimelineData();
      }
    );

    this.sizeChangedSubscription = this.windowSize.sizeChanged.subscribe(
      (currentSize: string) => {
        if (this._currentSize !== currentSize || this._currentSize === 'sm') {
          this._currentSize = currentSize;
          this._loadTimelineData();
        }
      }
    );
  }

  // create timeline table options and final table. dataTable is created within the timeline service
  private _loadTimelineData() {
    this.displayError = false;
    this.timelineData =  {
      chartType: 'Timeline',
      dataTable: this._timelineService.loadTimelineDataTable(this._categories, this._residences),
      options: {
        colors: ['#ff7200', '#3d3d3d', '#ffba44', '#ffcd77', '#ff6100'],
        width: (this._currentSize === 'xs') ? 750 : -1,
        height: 350,
        tooltip: { trigger: 'none' },
        timeline: {
          rowLabelStyle: {fontName: 'Helvetica', fontSize: 16, color: '#000000'}, barLabelStyle: {fontName: 'Arial', fontSize: 12}
        }
      }
    };
  }

  // send category and occurrence index for a timeline element that has been clicked, to the timeline service
  chartSelect(event: ChartSelectEvent) {
    const categoryId = this._timelineService.getDataTabToCateg()[event.row].categoryId;
    const occurrenceId = this._timelineService.getDataTabToCateg()[event.row].occurrenceId;

    if (categoryId !== 'residence') {
      this._timelineService.setClickedItemOccurrence(
        this._cvDataHandler.getCategoryByName(categoryId).categoryName,
        this._cvDataHandler.getOccurrenceByIds(categoryId, occurrenceId)
      );
    } else {
      this._timelineService.setClickedItemResidence(
        this._cvDataHandler.getResidenceById(occurrenceId)
      );
    }
  }

  // notify that timeline table finished loading
  ready() {
    this._timelineService.chartReady.next(true);
  }

  // execute in case of table display error
  error() {
    this.displayError = true;
    return (this.coreService.getLang() === 'eng') ?
      'An error was encountered while drawing the table' :
      'E\' stato incontrato un errore durante il rendering della tabella';
  }

  // public method returning a private variable
  getCurrentSize() {
    return this._currentSize;
  }

  // free memory from subscriptions on component destruction
  ngOnDestroy() {
      this.catReadySubscription.unsubscribe();
      this.resReadySubscription.unsubscribe();
    this.sizeChangedSubscription.unsubscribe();
  }
}
