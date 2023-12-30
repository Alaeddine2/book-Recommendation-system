import {Component, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('carouselEl', {static: true}) carousel!: MdbCarouselComponent;

  constructor(private paramsService: ParamsService, private homeService: HomeService) {
  }

  filterTxt: any;

  ngOnInit() {
    this.paramsService.postParams().subscribe(
      (response) => {
        if (response && response.data && response.data.bestBooks) {
          this.bestBooks = response.data.bestBooks;
          this.genresList = response.data.genresList;
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

  goToPrevSlide() {
    this.carousel.prev();
  }
  ;
}
