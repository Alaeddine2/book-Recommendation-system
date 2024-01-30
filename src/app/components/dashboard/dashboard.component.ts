import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public chart: any;

  constructor() { }

  ngOnInit() {
    this.createChart();
  }


  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['macharo akima', 'jhonson amily', 'kamoro niga','adelina', 'mohamed', 'salah', 'ahmed', 'mohamed'],
	       datasets: [
          {
            label: "number of books",
            data: ['50','12', '10', '18', '14',
								 '5', '2', '6'],
            backgroundColor: '#ea8bea'
          } 
        ]
      },
      options: {
        aspectRatio:2.5,
        responsive: true,
        animation: {
          duration: 3000,
          easing: 'easeInOutQuad'
        },
        transitions: {
          show: {
            animations: {
              x: {
                from: 0
              },
              y: {
                from: 0
              }
            }
          },
          hide: {
            animations: {
              x: {
                to: 0
              },
              y: {
                to: 0
              }
            }
          }
        },
      }
      
    });
  }
}
