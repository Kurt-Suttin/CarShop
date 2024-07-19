import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart.model';
import { Car } from './models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  updateShoppingCart(shoppingCart: ShoppingCart) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/cart'; // Adjust to your actual backend URL


  constructor(private http: HttpClient) {}

  getCart(cartId: number): Observable<ShoppingCart> {
    return this.http.get<ShoppingCart>(`${this.apiUrl}/${cartId}`);
  }

  addCarToCart(cartId: number, carId: number): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(`${this.apiUrl}/${cartId}/add/${carId}`, {});
  }

  removeCarFromCart(cartId: number, carId: number): Observable<ShoppingCart> {
    return this.http.delete<ShoppingCart>(`${this.apiUrl}/${cartId}/remove/${carId}`);
  }
  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/cars/${car.id}`, car);
  }
  
}
