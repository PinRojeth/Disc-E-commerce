// import { Component } from '@angular/core';
// import { Disc, DishesData } from '../dishes.model';
// import { DishService } from '../dishes.service';

// @Component({
//   selector: 'app-create-dish',
//   templateUrl: './dish-create.component.html',
//   styleUrls: ['./dish-create.component.css'],
// })
// export class CreateDishComponent {
//   newDish: Disc = {
//       name: '',
//       image: '',
//       description: '',
//       price: 0,
//       category: '',
//       feature: false,
//       label: '',
//       _id: '',
//       comments: [],
//       timestamps: undefined
//   };

//   constructor(private dishService: DishService) {}

//   createDish(): void {
//     this.dishService.createDish(this.newDish).subscribe((response) => {
//       console.log('Dish created:', response);
//       // Optionally, you can navigate to a different route or perform other actions
//     });
//   }
// }
