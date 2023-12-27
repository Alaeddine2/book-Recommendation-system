import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:8000/app/login';  // URL to web api

  constructor(private http: HttpClient) { }

  // login(username: string, password: string): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<any>(this.loginUrl, { username, password }, { headers });
  // }
// In your login.service.ts

  login(username: string, password: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.loginUrl, { username, password }, {
      headers: headers,
      observe: 'response'  // Add this to get the full HTTP response
    });
  }


}
