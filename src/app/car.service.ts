import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from './models/car.model';
import { ShoppingCart } from './models/shopping-cart.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private baseUrl = 'http://localhost:8080/api'; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/cars`);
  }
  getCarById(carId: number): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/cars/${carId}`);
  }
  getUnSoldCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/cars/unsold`);
  }

  getCarsByColor(color: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/cars/color/${color}`);
  }

  getCart(cartId: number): Observable<ShoppingCart> {
    return this.http.get<ShoppingCart>(`${this.baseUrl}/cart/${cartId}`);
  }

  addCarToCart(cartId: number, carId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cart/${cartId}/add/${carId}`, {});
  }

  removeCarFromCart(cartId: number, carId: number): Observable<ShoppingCart> {
    return this.http.delete<ShoppingCart>(`${this.baseUrl}/cart/${cartId}/remove/${carId}`);
  }

  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.baseUrl}/cars/${car.id}`, car);
  }
}
