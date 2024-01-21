import {
    AfterViewInit,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
  } from "@angular/core";
  import { BehaviorSubject } from "rxjs";
  
  @Component({
    selector: "number-counter",
    templateUrl: "counter.html",
    styleUrls: ["counter.scss"]
  })
  export class NumberCounter implements OnInit, OnChanges, AfterViewInit {
    @Input("number") number!: number;
    @Input("label") label!: string;
    @Input("duration") duration!: number;
  
    //counter: string = "0";
    counter = new BehaviorSubject<string>("0");
  
    constructor() {}
      ngOnInit(): void {
      }
  
    onOnInit() {}
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes["number"] && changes["duration"]) {
        console.log("Changes happening");
        this.counterFunc();
      }
    }
  
    ngAfterViewInit() {}
  
    counterFunc() {
      let start = 0;
      let end = parseInt(String(this.number).substring(0, 3));
  
      if (start === end) {
        return;
      }
  
      // find duration per increment
      let totalMilSecDur = this.duration;
      let incrementTime = (totalMilSecDur / end) * 1000;
  
      let timer = setInterval(() => {
        start += 1;
        this.counter.next(String(start) + this.number.toString().substring(3));
        //this.counter = String(start) + this.number.toString().substring(3);
        if (start === end) {
          clearInterval(timer);
        }
      }, incrementTime);
    }
  }
  