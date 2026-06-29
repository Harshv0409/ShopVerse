// Header — cart count localStorage se leta hai aur cartUpdated event sunता hai
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartCount = 0;

  ngOnInit(): void {
    // Page load pe localStorage se cart count lo
    this.updateCartCount();

    // Catalog cart mein kuch add kare toh header update ho
    window.addEventListener('cartUpdated', (event: any) => {
      this.cartCount = event.detail.count;
    });
  }

  private updateCartCount(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const items = JSON.parse(cart);
      this.cartCount = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    }
  }
}
