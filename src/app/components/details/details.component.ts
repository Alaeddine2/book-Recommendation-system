import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor() {
  }

  rate = 3;
  ratingNb = 1555;

  ngOnInit(): void {
  }

  downloadBook(): void {
    const link = document.createElement('a');
    link.href = 'assets/books/A-Game-of-Thrones.pdf';
    link.download = 'A-Game-of-Thrones.pdf';
    link.dispatchEvent(new MouseEvent('click'));
  }
}
