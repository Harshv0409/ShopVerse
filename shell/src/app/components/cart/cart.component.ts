// CartComponent — localStorage se cart items dikhata hai
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
  };
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const data = localStorage.getItem('cart');
    this.cartItems = data ? JSON.parse(data) : [];
  }

  // Item remove karo
  removeItem(productId: number): void {
    this.cartItems = this.cartItems.filter(i => i.product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));

    // Header count update karo
    const count = this.cartItems.reduce((sum, i) => sum + i.quantity, 0);
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count } }));
  }

  // Total price
  get totalPrice(): number {
    return this.cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }
}
