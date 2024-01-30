import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HomeService} from '../home/home.service';
import {ToastrService} from "ngx-toastr";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

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
  form!: FormGroup;
  bookId!: number;
  //value: Observable<number>;
  
  constructor(private route: ActivatedRoute,
              private homeService: HomeService,
              private changeDetectorRef: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const bookId = params['id'];
      this.bookId = bookId;
      this.fetchBookDetails(bookId);
    });
    this.form = this.formBuilder.group({
      rating: [0],
      review : ['']
    });
  }

  fetchBookDetails(bookId: number): void {
    // Call your API service here
    let userId = this.getCurrentUserId();
    this.homeService.getBookDetails(bookId, userId).subscribe(response => {
      console.log('API Response:', response); // Log for debugging
      this.book = response.data.book;
      this.bookExisteInPanel = response.data.book_exists_in_panel;
      console.log('bookExisteInPanel:', this.bookExisteInPanel);
      
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
    this.homeService.saveBook(userId, bookId).subscribe({


      next: (response) => {
        if (response.status && response.status === "400") {
          this.toastr.error('Book already in the panel');
        } else {
          this.toastr.success('Book saved successfully');
          this.bookExisteInPanel = true;
          this.changeDetectorRef.detectChanges();

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
        //this.fetchBookDetails(bookId);
        this.bookExisteInPanel = false;
        this.changeDetectorRef.detectChanges();
      },
      error: error => {
        this.toastr.error('Failed to remove the book');
        console.error('Error removing book:', error);
      }
    });

  }

  rateBook(){
    // display the rating from the form
    console.log(this.form.value.rating);
    console.log(this.form.value.review);
    // call the service to save the user reveiw
    const userId = this.getCurrentUserId();
    console.log('userId:', userId);
    console.log('bookId:', this.bookId);
    this.homeService.rateBook(userId!, this.bookId, this.form.value.rating, this.form.value.review).subscribe({
      next: (data) => {
        this.toastr.success('Book rated successfully');
        //this.fetchBookDetails(this.bookId);
        this.reviews.unshift({
          rating: this.form.value.rating,
          review: this.form.value.review,
          showFullReview: false,
          author: "you",
          image: "assets/img/149071.png"
        });
        this.form.reset();
        this.changeDetectorRef.detectChanges();
      },
      error: error => {
        this.toastr.error('Failed to rate the book');
        console.error('Error rating book:', error);
      }
    });
  }
  
}

