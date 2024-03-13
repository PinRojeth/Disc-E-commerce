import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoading = false;
  error: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.valid) {
      this.authService.login(form.value.email, form.value.password);
      this.authService.getAuthStatusListener().subscribe((authenticated) => {
        this.isLoading = false;
        if (!authenticated) {
          this.error = true;
        }
      });
    }
  }

  onSignUp() {
    this.router.navigate(['/signup']);
  }
}
