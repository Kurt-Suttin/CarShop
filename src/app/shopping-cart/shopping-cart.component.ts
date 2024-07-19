import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../cart.service';
import { ShoppingCart } from '../models/shopping-cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartAdded: boolean = false;
  cartId: number = 1; // Example cart ID
  shoppingCart: ShoppingCart = { id: 0, cars: [] }; // Initialize with an empty cart
  @Output() close = new EventEmitter<void>();
  @Output() removeFromCart = new EventEmitter<number>();


  constructor(private cartService: CartService) {}
showCart(){
  this.cartAdded = true
}
  ngOnInit(): void {
    this.loadCart();
  }
  closeShoppingCart() {
    console.log('Shopping List closed');
    this.close.emit();
  }
  loadCart(): void {
    this.cartService.getCart(this.cartId).subscribe(
      (data: ShoppingCart) => {
        this.shoppingCart = data;
      },
      (error: any) => {
        console.error('Error loading cart:', error);
      }
    );
  }

  
  removeCarFromCart(carId: number): void {
    this.cartService.removeCarFromCart(this.cartId, carId).subscribe(
      () => {
        console.log('Car removed from cart');
        this.loadCart(); // Refresh cart after removal
      },
      (error: any) => {
        console.error('Error removing car from cart:', error);
      }
    );
  }

  addCarToCart(carId: number): void {
    this.cartService.addCarToCart(this.cartId, carId).subscribe(
      () => {
        console.log('Car added to cart');
        this.loadCart(); // Refresh cart after addition
      },
      (error: any) => {
        console.error('Error adding car to cart:', error);
      }
    );
  }
}
