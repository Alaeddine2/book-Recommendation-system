import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private readonly API_URL = "http://127.0.0.1:5000/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  
  getBotResponse(input: string)
  {
    // Declare and Initialize Params Object
   let params = {
    'user_input': input
   };
   return      this.http.post(this.API_URL +
        'send', JSON.stringify(params), this.httpOptions);         
   
  }
}
