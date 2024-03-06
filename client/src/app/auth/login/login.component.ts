import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoading = false;

  constructor(public authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.authService.Login(form.value.email, form.value.password);
      this.authService.getAuthStatusListener().subscribe((authenticated) => {
        this.isLoading = false;
        if (authenticated) {
          // Login successful, navigate to the product page
          this.router.navigate(['/']);
        }
      });
    }
  }

  onSignUp() {
    this.router.navigate(['/signup']);
  }
}
