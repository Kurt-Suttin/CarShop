import { Car } from './car.model';

export interface ShoppingCart {
  id: number;
  cars: Car[];
  totalPrice?: number;  // Optional field for total price
  createdAt?: Date;     // Optional field for the creation date
}
