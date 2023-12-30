import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ParamsService {
  private paramsUrl = 'http://localhost:8000/app/params'; // Your API endpoint

  constructor(private http: HttpClient) {}

  getParams(): Observable<any> {
    const csrfToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken || '',
      })
    };

    return this.http.post<any>(this.paramsUrl, {}, httpOptions);
  }
}
