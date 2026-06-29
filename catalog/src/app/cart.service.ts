// CartService — cart ka sara data manage karta hai localStorage mein
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Jab shell cart se remove kare toh catalog ko bhi update karo
    window.addEventListener('cartUpdated', () => {
      const freshItems = this.loadFromStorage();
      this.cartItems.next(freshItems);
    });
  }

  addToCart(product: Product): void {
    const freshItems = this.loadFromStorage();
    this.cartItems.next(freshItems);

    const items = this.cartItems.getValue();
    const existing = items.find(item => item.product.id === product.id);

    if (existing) {
      existing.quantity++;
      this.cartItems.next([...items]);
    } else {
      this.cartItems.next([...items, { product, quantity: 1 }]);
    }

    this.saveToStorage(this.cartItems.getValue());

    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { count: this.getTotalCount() }
    }));
  }

  removeFromCart(productId: number): void {
    const items = this.cartItems.getValue().filter(i => i.product.id !== productId);
    this.cartItems.next(items);
    this.saveToStorage(items);
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { count: this.getTotalCount() }
    }));
  }

  getTotalCount(): number {
    return this.cartItems.getValue().reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.getValue().reduce(
      (sum, item) => sum + item.product.price * item.quantity, 0
    );
  }

  private saveToStorage(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  private loadFromStorage(): CartItem[] {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  }
}
