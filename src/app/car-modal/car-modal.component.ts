import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['./car-modal.component.css'],
})
export class CarModalComponent {
  @Input() selectedCar: Car | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<number>();
  cartAdded: boolean = false;
  cartId: any|string;

  constructor() {}

  closeModal() {
    console.log('Modal closed');
    this.close.emit();
  }

  addCarToCart(): void {
    if (this.selectedCar) {
      this.addToCart.emit(this.selectedCar.id);
      console.log(this.selectedCar);
      this.cartAdded = true; // Set to true once item is added to cart
    }
  }
}
