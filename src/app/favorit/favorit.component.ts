import {Component, OnInit} from '@angular/core';
import {HomeService} from "../components/home/home.service";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-favorit',
  templateUrl: './favorit.component.html',
  styleUrls: ['./favorit.component.scss']
})
export class FavoritComponent implements OnInit {
  favoriteBooks: any[] = [];
  isDataLoaded: boolean = false;

  constructor(private homeService: HomeService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.fetchFavoriteBooks();
  }

  fetchFavoriteBooks() {
    const userId = this.getCurrentUserId();

    this.isDataLoaded = false;
    this.homeService.getFavoriteBooks(userId).subscribe(
      response => {
        if (response.status === '204' && response.data) {
          this.favoriteBooks = response.data;
          this.isDataLoaded = true;
        }
      },
      error => {
        console.error('Error fetching favorite books:', error);
        this.isDataLoaded = true;
      }
    );
  }

  removeBook(bookId: number) {
    const userId = this.getCurrentUserId();

    this.homeService.removeBookFromPanel(userId, bookId).subscribe({
      next: () => {
        this.toastr.success('Book removed from panel');
        this.fetchFavoriteBooks(); // Refresh the list of books
      },
      error: error => {
        this.toastr.error('Failed to remove the book');
        console.error('Error removing book:', error);
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

}
