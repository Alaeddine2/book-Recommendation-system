import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbCarouselComponent } from 'mdb-angular-ui-kit/carousel';
import {ParamsService} from "../../params.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bestBooks: any[] = [];
  @ViewChild('carouselEl', { static: true }) carousel!: MdbCarouselComponent;

  constructor(private paramsService: ParamsService) { }
  filterTxt: any;
  ngOnInit() {
    this.paramsService.getParams().subscribe(
      (response) => {
        if (response && response.data && response.data.bestBooks) {
          this.bestBooks = response.data.bestBooks;
        }
      },
      (error) => {
        console.error('Error fetching params', error);
      }
    );
  }  goToNextSlide() {
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
  ];
}
