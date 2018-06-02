import { Component, OnInit, ViewChild } from '@angular/core';
import { TimelineService } from '../timeline.service';
import { NouisliderComponent } from 'ng2-nouislider';
import { WindowSizeService } from '../../shared/services/window-size.service';
import 'nouislider/distribute/nouislider.min.css';
import { BrowserDetectorService } from '../../shared/services/browser-detector.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: [
    './slider.component.scss',
  ]
})
export class SliderComponent implements OnInit {
  @ViewChild('tlSlider') tlSlider: NouisliderComponent;
  rangeConfig: any;
  absMin: number;
  absMax: number;
  tlSliderInitializer: number[];

  constructor(
    public timelineService: TimelineService,
    public windowSize: WindowSizeService,
    public browserDetector: BrowserDetectorService
  ) { }

  ngOnInit() {
    this.absMin = this.timelineService.getAbsMinDate().getFullYear();
    this.absMax = this.timelineService.getAbsMaxDate().getFullYear();
    this.tlSliderInitializer = [this.timelineService.getMinDate().getFullYear(), this.timelineService.getMaxDate().getFullYear()];
    const range = {
        'min': [1985, 1],
        '15%': [1999, 1],
        'max': [this.absMax, 1]
      };

    this.rangeConfig = {
      behaviour: 'drag-tap',
      connect: true,
      margin: 0,
      step: 1,
      keyboard: true,
      range: range,
      pips: {
        mode: 'range',
        density: 100
      }
    };
  }

  onDecrease(event) {
    const posArray = this.tlSlider.slider.get();
    const senderId = event.target.attributes.id.value;
    if (senderId === 'decreaseMin') {
      this.tlSlider.slider.set([--posArray[0], posArray[1]]);
    } else {
      this.tlSlider.slider.set([posArray[0], --posArray[1]]);
    }
  }

  onIncrease(event) {
    const posArray = this.tlSlider.slider.get();
    const senderId = event.target.attributes.id.value;
    if (senderId === 'increaseMin') {
      this.tlSlider.slider.set([++posArray[0], posArray[1]]);
    } else {
      this.tlSlider.slider.set([posArray[0], ++posArray[1]]);
    }
  }

  onSliderChange(event) {
    this.timelineService.setMinDate(new Date(event[0], 0, 1));
    this.timelineService.setMaxDate(new Date(event[1], 11, 31));
  }
}
