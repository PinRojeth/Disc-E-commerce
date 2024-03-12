import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Disc, DishesData } from './dishes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private baseUrl: string = 'http://localhost:3000/dishes';
  private dishes: Disc[] = [];

  constructor(private http: HttpClient) {}

  getAllDishes(): Observable<DishesData> {    
    return this.http.get<DishesData>(this.baseUrl);
  }

  getDishById(id: string): Observable<Disc> {
    return this.http.get<Disc>(`${this.baseUrl}/${id}`);
  }

  // createDish(dishData: DishesData): Observable<DishesData> {
  //   return this.http.post<DishesData>(`${this.baseUrl}/`, dishData);
  // }
}
