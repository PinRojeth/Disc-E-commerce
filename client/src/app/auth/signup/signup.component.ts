import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent {
  isLoading = false;
  constructor(public authService: AuthService, private router: Router) {}

  onSignUp(form: NgForm) {
    if (form.valid) {
      this.authService.signupUser(
        form.value.username,
        form.value.email,
        form.value.password,
        form.value.confirmPassword
      );
      this.router.navigate(['/login'])
    }
  }
}
