import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { DishesListComponent } from './Dishes/dish-list/dish-list.component';
import { DishDetailComponent } from './Dishes/dish-detail/dish-detail.component';

import { AuthGuard } from './auth/auth.guard';
import { CommentCreateComponent } from './Dishes/comment-create/comment-create.component';
import { CreateDishComponent } from './Dishes/dish-create/dish-create.component';

const routes: Routes = [
  { path: '', component: DishesListComponent },
  {
    path: 'dishes',
    component: DishesListComponent,
  },
  {
    path: 'dishes/create',
    component: CreateDishComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dishes/:dishid',
    component: DishDetailComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'comments', component: CommentCreateComponent }],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
