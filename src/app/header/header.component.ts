import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isSessionKeyPresent: boolean = false;
  constructor(private router: Router) {
    this.isSessionKeyPresent = !!sessionStorage.getItem('rpId');
  }

  navigateToRegistration() {
    this.router.navigate(['/register']);
  }

  logout() {
    sessionStorage.removeItem('rpId');
  }
}
