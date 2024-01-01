import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  book: any;
  reviews: any[] = [];
  rate = 3;
  ratingNb = 1555;

  constructor(private route: ActivatedRoute, private homeService: HomeService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const bookId = params['id'];
      this.fetchBookDetails(bookId);
    });
  }

  fetchBookDetails(bookId: number): void {
    // Call your API service here
    this.homeService.getBookDetails(bookId).subscribe(response => {
      console.log('API Response:', response); // Log for debugging
      this.book = response.data.book;
      this.reviews = response.data.reviews.map((review: any) => ({
        ...review,
        showFullReview: false // add this line
      }));      this.changeDetectorRef.detectChanges();
    }, error => {
      console.error('API Error:', error); // Log errors
    });
  }
  downloadBook(): void {
    const link = document.createElement('a');
    link.href = 'assets/books/A-Game-of-Thrones.pdf';
    link.download = 'A-Game-of-Thrones.pdf';
    link.dispatchEvent(new MouseEvent('click'));
  }

  getStarsArray(rating: number): any[] {
    return new Array(rating ? Math.floor(rating) : 0);
  }

  getEmptyStarsArray(rating: number): any[] {
    return new Array(rating ? 5 - Math.floor(rating) : 5);
  }

}

