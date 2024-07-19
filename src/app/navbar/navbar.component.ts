import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUrlEndpoint: string = '';
  @Output() showCart = new EventEmitter<void>();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route.root)
    ).subscribe(() => {
      this.currentUrlEndpoint = this.getCurrentUrlEndpoint(this.router.url);
    });
  }

  getCurrentUrlEndpoint(url: string): string {
    const segments = url.split('/');
    return segments[1]; // Adjust index based on your route structure
  }

  handleOpenCart(): void {
    this.showCart.emit(); // Emit the event to show the cart
  }
}
