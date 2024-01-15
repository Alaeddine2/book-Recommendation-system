import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HomeService} from "../components/home/home.service";

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent {

  constructor(private homeService: HomeService, private router: Router) {
  }

  logout() {
    this.homeService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful', response);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
        // Optionally handle the logout error (e.g., show a message to the user)
      }
    });

  }



}
