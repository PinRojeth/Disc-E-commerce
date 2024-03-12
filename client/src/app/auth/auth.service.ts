import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData, LoginData } from './auth-data.model';
import { Observable, Subject, catchError, pipe, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';

  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  private isAuthenticated = false;
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signupUser(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<AuthData> {
    const authData: AuthData = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    return this.http.post<AuthData>(`${this.baseUrl}/signup`, authData).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  login(email: string, password: string) {
    const loginData: LoginData = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; expiresIn: number }>(
        `${this.baseUrl}/login`,
        loginData
      )
      .pipe(
        catchError((error) => {
          this.isAuthenticated = false;
          this.authStatusListener.next(false);
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe((res) => {
        const token = res.token;
        this.token = token;
        if (token) {
          const expiresInDuration = res.expiresIn;
          console.log(expiresInDuration);

          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);

          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/dishes']);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(authInformation, expiresIn);

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);

    this.tokenTimer = setTimeout(() => {
      // this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if (!token || !expirationDate) {
      console.log('err');
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }
}
