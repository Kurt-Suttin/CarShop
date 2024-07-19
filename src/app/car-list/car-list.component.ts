import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../car.service';
import { CartService } from '../cart.service';
import { ShoppingCart } from '../models/shopping-cart.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  selectedCar: Car | null = null;
  cartAdded: boolean = false;
  cartId: number = 1; // Example cart ID
  filterOption: 'all' | 'available' | 'color' = 'all'; // Default to show all cars
  cartMessage: string | null = null;
  showMessage: boolean = false;
  selectedColor: string = '';

  constructor(
    private carService: CarService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService.getAllCars().subscribe(
      (data: Car[]) => {
        this.cars = data;
        this.filterAvailableCars(); // Apply initial filtering
      },
      (error: any) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  toggleFilter(option: 'all' | 'available' | 'color'): void {
    this.filterOption = option;
    this.filterAvailableCars(); // Update filtered cars based on option
  }

  filterAvailableCars(): void {
    if (this.filterOption === 'available') {
      this.filteredCars = this.cars.filter(car => !car.sold);
    } else if (this.filterOption === 'color' && this.selectedColor) {
      this.carService.getCarsByColor(this.selectedColor).subscribe(
        (data: Car[]) => {
          this.filteredCars = data;
        },
        (error: any) => {
          console.error('Error fetching cars by color:', error);
        }
      );
    } else {
      this.filteredCars = [...this.cars]; // Show all cars
    }
  }

  selectCar(car: Car): void {
    this.selectedCar = car;
    console.log(car.sold); // Example logging
  }

  closeModal(): void {
    this.selectedCar = null;
  }

  handleCartClose(): void {
    this.cartAdded = false; // Reset cartAdded to false when cart is closed
  }

  addCarToCart(carId: number): void {
    if (this.selectedCar) {
      this.cartService.addCarToCart(this.cartId, carId).subscribe(
        (data: any) => {
          console.log('Car added to cart:', data);
          this.cartMessage = `${this.selectedCar?.name} was added to your cart`;
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000); // Hide message after 3 seconds
          this.closeModal();
        },
        (error: any) => {
          console.error('Error adding car to cart:', error);
        }
      );
    }
  }

  removeCarFromCart(carId: number): void {
    this.cartService.removeCarFromCart(this.cartId, carId).subscribe(
      (data: any) => {
        console.log('Car removed from cart:', data);
        this.loadCart(); // Refresh cart after removal
      },
      (error: any) => {
        console.error('Error removing car from cart:', error);
      }
    );
  }

  loadCart(): void {
    this.cartService.getCart(this.cartId).subscribe(
      (data: ShoppingCart) => {
        console.log('Shopping Cart loaded:', data);
      },
      (error: any) => {
        console.error('Error loading cart:', error);
      }
    );
  }

  showCart(): void {
    this.cartAdded = true; // Show the cart when called
  }

  updateColorFilter(color: string): void {
    this.selectedColor = color;
    this.toggleFilter('color');
  }
}
