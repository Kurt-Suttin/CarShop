// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'; // Import the ShoppingCartComponent
import { CheckoutCartComponent } from './checkout-cart/checkout-cart.component';

const routes: Routes = [
  { path: 'list', component: CarListComponent },
  { path: 'checkout-cart', component: CheckoutCartComponent },
  { path: 'cart/:cartId', component: ShoppingCartComponent }, // Dynamic cart ID parameter
  { path: 'checkout', component: CheckoutCartComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
