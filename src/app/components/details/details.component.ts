import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HomeService} from '../home/home.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  book: any;
  reviews: any[] = [];
  bookExisteInPanel: boolean = false;
  rate = 3;
  ratingNb = 1555;

  constructor(private route: ActivatedRoute,
              private homeService: HomeService,
              private changeDetectorRef: ChangeDetectorRef,
              private toastr: ToastrService) {
  }

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
      this.bookExisteInPanel = response.data.book_existe_in_panel;
      console.log('bookExisteInPanel:', response.data.book_exists_in_panel);

      this.reviews = response.data.reviews.map((review: any) => ({
        ...review,
        showFullReview: false
      }));
      this.changeDetectorRef.detectChanges();
    }, error => {
      console.error('API Error:', error);
    });
  }

  downloadBook(bookId: number) {
    this.homeService.downloadBook(bookId).subscribe({
      next: (response: any) => {
        if (response.status === '200' && response.data && response.data.book_url) {
          const link = document.createElement('a');
          link.href = 'assets/books/A-Game-of-Thrones.pdf';
          link.download = 'A-Game-of-Thrones.pdf';
          // link.href = response.data.book_url;
          // link.download = response.data.title + '.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          this.toastr.success('Book downloaded successfully!');
        } else {
          console.error('Download failed:', response);
          this.toastr.error('Failed to download the book.');
        }
      },
      error: (error) => {
        console.error('Error downloading the book:', error);
        this.toastr.error('Error occurred while downloading the book.');
      }
    });
  }

  getStarsArray(rating: number): any[] {
    return new Array(rating ? Math.floor(rating) : 0);
  }

  getEmptyStarsArray(rating: number): any[] {
    return new Array(rating ? 5 - Math.floor(rating) : 5);
  }

  saveBook(bookId: number): void {

    const userId = this.getCurrentUserId();
    console.log('userId:', userId);
    console.log('bookId:', bookId);
    this.homeService.saveBook(userId, bookId).subscribe({


      next: (response) => {
        if (response.status && response.status === "400") {
          this.toastr.error('Book already in the panel');
        } else {
          this.toastr.success('Book saved successfully');
        }
      },
      error: (error) => {
        console.error('Error:', error);
        this.toastr.error('An error occurred while saving the book');
      }
    });
  }

  private getCurrentUserId(): number | null {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log('userData:', userData.id);
      return +userData.id;
    }

    return -1;
  }

  removeBook(bookId: number) {
    const userId = this.getCurrentUserId();
    console.log('userId:', userId);
    console.log('bookId:', bookId);
    this.homeService.removeBookFromPanel(userId, bookId).subscribe({
      next: () => {
        this.toastr.success('Book removed from panel');
        this.fetchBookDetails(bookId);
      },
      error: error => {
        this.toastr.error('Failed to remove the book');
        console.error('Error removing book:', error);
      }
    });

  }
}

