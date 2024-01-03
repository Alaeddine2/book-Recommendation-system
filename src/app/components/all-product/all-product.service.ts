import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ParamsService } from 'src/app/params.service';

@Injectable({
  providedIn: 'root'
})
export class AllProductService {

  constructor(private http: HttpClient) { }

  getBooksByPagination(limit: number, skip: number): Observable<any> {
    const csrfTokenCockies = this.getCookie('csrftoken');

    const body = {limit: limit, skip: skip};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': '' + csrfTokenCockies,
    });
    return this.http.post<any>('http://localhost:8000/app/books/pagination', body, {headers: headers});
  }

  private getCookie(name: string): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(';').shift();
        if (cookieValue) {
            return cookieValue;
        }
    }

      return '';
  }

}
