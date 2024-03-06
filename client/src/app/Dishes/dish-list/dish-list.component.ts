import { Component, OnDestroy, OnInit } from '@angular/core';
import { DishService } from '../dishes.service';
import { Disc, DishesData } from '../dishes.model';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css'],
})
export class DishesListComponent implements OnInit, OnDestroy {
  dishes: Disc[] = [];
  private authStatusSub: Subscription;
  public userIsAuthenticated = false;
  public openDialog = false;
  constructor(
    private dishService: DishService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dishService.getAllDishes().subscribe((res: DishesData) => {
      this.dishes = res.data;
      console.log(this.dishes);
    });
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
