import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  ngOnInit() {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthticated) => {
        this.userIsAuthenticated = isAuthticated;
      });
  }
  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
