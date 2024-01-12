import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ParamsService {
  private paramsUrl = 'http://localhost:8000/app/params';
  private paramsUrlTwo = 'http://localhost:8000/app/api/recommandation';

  constructor(private http: HttpClient) {
  }

  postParams(): Observable<any> {

    const csrfToken = localStorage.getItem('token');
    const csrfTokenCockies = this.getCookie('csrftoken');
    console.log('csrfToken:', csrfToken);
    console.log('csrfTokenCockies:', csrfTokenCockies);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': '' + csrfTokenCockies,
        'Authorization': 'Bearer ' + csrfTokenCockies,
      }),
      // withCredentials: true,
    };

    return this.http.post<any>(this.paramsUrl, {}, httpOptions, );
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

  // get recommendedBooks()
  recommendedBooks(): Observable<any> {
    // get user id from local storage
    const userId = localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData') || '{}').id
    : 0;
    console.log('userId:', userId);

    const csrfTokenCockies = this.getCookie('csrftoken');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': '' + csrfTokenCockies,
        'Authorization': 'Bearer ' + csrfTokenCockies,
      }),
      // withCredentials: true,
    };


    return this.http.post<any>(this.paramsUrlTwo, {"user_id": 1}, httpOptions, );
  }

}
