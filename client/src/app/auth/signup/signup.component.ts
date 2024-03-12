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
  error: string = null;
  constructor(public authService: AuthService, private router: Router) {}

  onSignUp(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;

      this.authService
        .signupUser(
          form.value.username,
          form.value.email,
          form.value.password,
          form.value.confirmPassword
        )
        .subscribe(
          () => {
            this.isLoading = false;
            this.router.navigate(['/login']);
          },
          (errorResponse) => {
            this.isLoading = false;
            this.error = errorResponse.error.error;
            console.log(errorResponse.error.error);
          }
        );
    }
  }
}
