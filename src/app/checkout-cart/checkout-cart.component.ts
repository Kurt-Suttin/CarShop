import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ShoppingCart } from '../models/shopping-cart.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from '../models/car.model'; // Assuming Car model is defined
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit {
  cartId: number = 1; // Example cart ID
  shoppingCart: ShoppingCart = { id: 0, cars: [] }; // Initialize with an empty cart
  paymentForm: FormGroup;
  paymentCompleted: boolean = false; // Flag to track if payment is completed

  constructor(
    private cartService: CartService, 
    private fb: FormBuilder,
    private router: Router // Inject Router
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCart();
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

  getTotalPrice(): number {
    return this.shoppingCart.cars.reduce((sum, car) => sum + car.price, 0);
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Payment form data:', this.paymentForm.value);

      // Simulate payment process

      // Update cars to mark them as sold
      let carUpdateCount = this.shoppingCart.cars.length;
      this.shoppingCart.cars.forEach((car: Car) => {
        console.log(car.id);

        car.sold = true;
        this.cartService.updateCar(car).subscribe(
          () => {
            console.log(`Car ${car.id} marked as sold`);
            carUpdateCount--;
            if (carUpdateCount === 0) {
              this.paymentCompleted = true; // Set payment completed flag
              this.router.navigate(['/list']); // Navigate to the list page
            }
          },
          (error: any) => {
            this.paymentCompleted = false; // Ensure payment completed flag is false on error
            console.error(`Failed to update car ${car.id}:`, error);
            // Handle error, show message to user, etc.
          }
        );
      });

      setTimeout(() => {
        this.paymentCompleted = false; // Reset flag after displaying message (optional)
      }, 5000); // Reset after 5 seconds (adjust as needed)
    } else {
      console.error('Payment form is invalid');
    }
  }

  // Function to get access to form controls
  get paymentFormControl() {
    return this.paymentForm.controls;
  }
}
