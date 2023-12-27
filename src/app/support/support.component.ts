import { Component } from '@angular/core';
import { SupportService } from './support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  title = 'Support';
  message = '';
    tchats = [{
      type: 'bot',
      messages: "Hello, I'm your Bookito boot. How can I help you?",
      isTyping: false
    }];

  sendMessage(){
    this.tchats.push({
      type: 'user',
      messages: this.message, 
      isTyping: false
    });
    this.tchats.push({
      type: 'bot',
      messages: '...', 
      isTyping: false
    });
    this._supportService.getBotResponse(this.message).subscribe((data: any) => {
      this.tchats.pop();
      this.tchats.push({
        type: 'bot',
        messages: data.data, 
        isTyping: true
      });
      setTimeout(() => {
        console.log(this.tchats[this.tchats.length - 1]);
        
        this.tchats[this.tchats.length - 1].isTyping = false;
      }, 2000);
    });   
    
    this.message = '';
  }

    constructor(private _supportService:  SupportService,) { }
  ngOnInit() {
    
  }
}

interface ResModel {
  code: number;
  data: string;
  result: string;
}