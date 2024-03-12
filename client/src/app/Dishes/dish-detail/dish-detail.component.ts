import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Disc } from '../dishes.model';
import { DishService } from '../dishes.service';

@Component({
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css'],
})
export class DishDetailComponent implements OnInit {
  dish: Disc;

  constructor(
    private route: ActivatedRoute,
    private dishesService: DishService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['dishid'];
      console.log('Dish ID:', id);
      this.getDishDetailById(id);
    });
  }

  getDishDetailById(id: string) {
    this.dishesService.getDishById(id).subscribe((res) => {
      this.dish = res.data.Disc;
      console.log(this.dish);
    });
  }

  createComment() {}
}
