import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomepageComponent implements OnInit {
  images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(config: NgbCarouselConfig) { 
    // customize default values of carousels used by this component tree
    config.interval = 1000;
    config.wrap = true;
    config.keyboard = true;
    // config.pauseOnHover = false;
  }

  ngOnInit() {
  }

}
