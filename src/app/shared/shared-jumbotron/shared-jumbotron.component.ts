import { Component, OnDestroy, OnInit } from '@angular/core';
import { WindowSizeService } from '../services/window-size.service';
import { SharedJumbotronService } from './shared-jumbotron.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shared-jumbotron',
  templateUrl: './shared-jumbotron.component.html',
  styleUrls: ['./shared-jumbotron.component.scss']
})
export class SharedJumbotronComponent implements OnInit, OnDestroy {
  location = 'milan';
  locationAddress = '2: Via Francesco Olgiati, 25. 20143 Milano, MI';
  paramsSubscription: Subscription;

  constructor(
    public windowSize: WindowSizeService,
    public sharedJumbotronService: SharedJumbotronService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.queryParamMap.subscribe(
      (params: ParamMap) => {
        if (params.get('location')) {
          this.location = params.get('location');
          this.locationAddress = (this.location === 'savigliano') ?
            '1: Via Galimberti, 35. 12038 Savigliano, CN' :
            '2: Via Francesco Olgiati, 25. 20143 Milano, MI';
        }
      });
  }

  getAddress() {
    return (this.location === 'savigliano') ?
      'address_savi' :
      'address_milan';
  }

  changeAddress() {
    if (this.location === 'milan') {
      this.location = 'savigliano';
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {location: 'savigliano'},
        queryParamsHandling: 'merge' });
    } else {
      this.location = 'milan';
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {location: 'milan'},
        queryParamsHandling: 'merge'});
    }
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
