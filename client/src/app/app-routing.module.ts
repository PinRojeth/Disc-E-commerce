import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DishesListComponent } from './Dishes/dish-list/dish-list.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: DishesListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
