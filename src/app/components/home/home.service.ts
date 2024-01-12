import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  getBooksByGenre(genre: string): Observable<any> {
    const body = {genre: genre};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers like 'Authorization' if needed
    });
    return this.http.post<any>('http://localhost:8000/app/books/genre', body, {headers: headers});
  }

  searchBooks(userInput: string): Observable<any> {
    const body = {user_input: userInput};
    return this.http.post<any>("http://localhost:8000/app/api/search", body);
  }

  getBookDetails(bookId: number): Observable<any> {
    console.log(bookId);
    return this.http.post('http://localhost:8000/app/books/details', { book_id: +bookId });
  }

  getBookReviews(bookId: number): Observable<any> {
    return this.http.post<any>('http://localhost:8000/app/books/reviews', { book_id: bookId });
  }

  saveBook(userId: number | null, bookId: number): Observable<any> {
    const body = { user_id: userId, book_id: bookId };
    return this.http.post<any>('http://localhost:8000/app/books/panel/add', body);
  }

  getFavoriteBooks(userId: number | null): Observable<any> {
    return this.http.post<any>('http://localhost:8000/app/books/panel', { user_id: userId });
  }

  removeBookFromPanel(userId: number | null, bookId: number): Observable<any> {
    return this.http.post<any>('http://localhost:8000/app/books/panel/remove', { user_id: userId, book_id: bookId });
  }

}
