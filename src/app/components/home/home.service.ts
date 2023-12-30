import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getBooksByGenre(genre: string): Observable<any> {
    const body = { genre: genre };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers like 'Authorization' if needed
    });
    return this.http.post<any>('http://localhost:8000/app/books/genre', body, { headers: headers });
  }
}
