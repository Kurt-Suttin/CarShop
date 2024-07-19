import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarListComponent } from './car-list/car-list.component';
import { CarModalComponent } from './car-modal/car-modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutCartComponent } from './checkout-cart/checkout-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarModalComponent,
    NavbarComponent,
    ShoppingCartComponent,
    CheckoutCartComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
