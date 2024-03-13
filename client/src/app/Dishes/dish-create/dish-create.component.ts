import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Disc } from '../dishes.model';
import { DishService } from '../dishes.service';

@Component({
  selector: 'app-create-dish',
  templateUrl: './dish-create.component.html',
  styleUrls: ['./dish-create.component.css'],
})
export class CreateDishComponent {
  newDishForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dishService: DishService
  ) {
    this.newDishForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: '',
      description: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
      feature: [false],
      label: [false],
    });
  }

  get formControls() {
    return this.newDishForm.controls;
  }

  createDish(): void {
    if (this.newDishForm.invalid) {
      // Stop here if the form is invalid
      return;
    }

    const newDishData: Disc = this.newDishForm.value;

    this.dishService.createDish(newDishData).subscribe(
      (response) => {
        console.log('Dish created:', response);
        // Optionally, you can navigate to a different route or perform other actions
      },
      (error) => {
        console.error('Error creating dish:', error);
      }
    );
  }
}
