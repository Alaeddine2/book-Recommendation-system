import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
