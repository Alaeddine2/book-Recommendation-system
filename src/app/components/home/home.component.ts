import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbCarouselComponent } from 'mdb-angular-ui-kit/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('carouselEl', { static: true }) carousel!: MdbCarouselComponent;

  constructor() { }

  ngOnInit(): void {
  }
  goToNextSlide() {
    this.carousel.next();
  }

  // Example method to programmatically move to the previous slide
  goToPrevSlide() {
    this.carousel.prev();
  }
  sliderItems = [
    {
      title: 'Life of the Wild',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      imageSource: 'assets/images/main-banner1.jpg'
    },
    {
      title: 'Birds gonna be Happy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      imageSource: 'assets/images/main-banner2.jpg'
    }
    // Add more items as needed
  ];
}
