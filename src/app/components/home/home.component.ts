import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MdbCarouselComponent} from 'mdb-angular-ui-kit/carousel';
import {ParamsService} from "../../params.service";
import {HomeService} from "./home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bestBooks: any[] = [];
  genresList: any[] = [];
  currentGenre: string = 'All Genre';
  books: any[] = [];
  searchResults: any[] = [];
  filterTxt: string = '';
  bestBooksDataRecieved: boolean = false;
  @ViewChild('carouselEl', {static: true}) carousel!: MdbCarouselComponent;

  constructor(private paramsService: ParamsService, private homeService: HomeService,private CD : ChangeDetectorRef) {
  }


  ngOnInit() {
    this.paramsService.postParams().subscribe(
      (response) => {
        if (response && response.data && response.data.bestBooks) {
          this.bestBooksDataRecieved = true;
          this.bestBooks = response.data.bestBooks;
          this.genresList = response.data.genresList;
          this.CD.detectChanges();
        }
      },
      (error) => {
        console.error('Error fetching params', error);
      }
    );
  }

  goToNextSlide() {
    this.carousel.next();
  }

  selectGenre(genre: string) {
    this.currentGenre = genre;
    if (genre === 'All Genre') {
    } else {
      this.homeService.getBooksByGenre(genre).subscribe(
        (response) => {
          this.books = response.data;
        },
        (error) => {
          console.error('Error fetching books by genre', error);
        }
      );
    }
  }
  searchBooks() {
    if (!this.filterTxt) {
      // If the search term is empty, clear the search results
      this.searchResults = [];
      return;
    }
    this.homeService.searchBooks(this.filterTxt).subscribe(
      (response) => {
        // Assuming the response has a property 'books' which is an array of book data
        this.searchResults = response.data;
      },
      (error) => {
        console.error('Error searching books:', error);
      }
    );
  }
  goToPrevSlide() {
    this.carousel.prev();
  }
  ;
}
