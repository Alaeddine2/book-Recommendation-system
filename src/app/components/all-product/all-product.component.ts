import { Component, OnInit } from '@angular/core';
import { AllProductService } from './all-product.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {

  constructor(private allProductService: AllProductService) { }

  currentPage: number = 1;
  pageSize: number = 10;
  //displayedPages: number[] = [1, 2, 3, 4, 5];
  totalItems: number = 9829;
  books: any[] = [];
  isDataLoaded: boolean = false;
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get displayedPages(): number[] {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, startPage + 4);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }

  ngOnInit(): void {
    //call get paggination
    this.getBooksByPagination()
  }

  getBooksByPagination(): void {
    this.isDataLoaded = false;
    this.allProductService.getBooksByPagination(this.pageSize, (this.currentPage - 1) * this.pageSize).subscribe(
      (response) => {
        if (response && response.data) {
          this.books = response.data;
          console.log(this.books);
          this.isDataLoaded = true;
        }
      },
      (error) => {
        console.error('Error fetching params', error);
      }
    );
  }

  goPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getBooksByPagination()
    }
  }

  goNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getBooksByPagination()
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getBooksByPagination()
    }
  }
}
