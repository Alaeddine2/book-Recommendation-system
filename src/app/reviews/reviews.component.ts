import { Component, OnInit } from '@angular/core';
import { HomeService } from "../components/home/home.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviewsExtended: any[] = [];   rate = 3;
  ratingNb = 1555;
  bookId: number | undefined;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      this.fetchReviews();
    });
  }

  fetchReviews(): void {
    if (this.bookId) {
      this.homeService.getBookReviews(this.bookId).subscribe({
        next: (response) => {
          this.reviewsExtended = response.data.map((review: any) => ({
            ...review,
            showMore: false
          }));
        },
        error: (error) => {
          console.error('Error fetching reviews', error);
        }
      });
    }
  }
  toggleShowMore(review: any): void {
    review.showMore = !review.showMore;
  }
}
