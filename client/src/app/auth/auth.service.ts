import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData, LoginData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';

  private token: string;

  private authStatusListener = new Subject<boolean>();

  private isAuthenticated = false;
  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signupUser(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const authData: AuthData = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    this.http.post(`${this.baseUrl}/signup`, authData).subscribe((response) => {
      console.log(response);
      return response;
    });
  }
  Login(email: string, password: string) {
    const authData: LoginData = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, authData)
      .subscribe((response) => {
        console.log(response);
        const token = response?.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
        }
      });
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
  }
}
