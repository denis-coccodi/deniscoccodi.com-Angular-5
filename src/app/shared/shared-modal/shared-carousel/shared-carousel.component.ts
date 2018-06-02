import { Component, OnInit } from '@angular/core';
import { CvImagesService } from '../cv-images.service';

@Component({
  selector: 'app-shared-carousel',
  templateUrl: './shared-carousel.component.html',
  styleUrls: ['./shared-carousel.component.scss']
})
export class SharedCarouselComponent implements OnInit {

  constructor(public cvImgService: CvImagesService) { }

  ngOnInit() {
  }

}
