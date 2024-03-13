import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Disc, DishesData } from './dishes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private baseUrl: string = 'https://disc-e-commerce.onrender.com/dishes';
  private dishes: Disc[] = [];

  constructor(private http: HttpClient) {}

  getAllDishes(): Observable<DishesData> {
    return this.http.get<DishesData>(this.baseUrl);
  }

  getDishById(id: string): Observable<Disc> {
    return this.http.get<Disc>(`${this.baseUrl}/${id}`);
  }

  createDish(dishData: Disc): Observable<Disc> {
    return this.http.post<Disc>(`${this.baseUrl}`, dishData);
  }
}
