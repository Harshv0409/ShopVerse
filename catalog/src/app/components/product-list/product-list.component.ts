import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../product.service';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  loading = true;
  error = '';
  cartProductIds: Set<number> = new Set(); // cart mein kaunse products hain
  toastMessage = '';
  showToast = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = 'Products load nahi ho sake. Backend chal raha hai?';
        this.loading = false;
        console.error(err);
      }
    });

    // Pehle se cart mein jo hain unhe mark karo
    this.cartService.cartItems$.subscribe(items => {
      this.cartProductIds = new Set(items.map(i => i.product.id));
    });
  }

  isInCart(productId: number): boolean {
    return this.cartProductIds.has(productId);
  }

  addToCart(product: Product): void {
    if (this.isInCart(product.id)) return;
    this.cartService.addToCart(product);
    this.showToastMessage(product.name + ' added to cart!');
  }

  // Toast notification dikhao
  showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000); // 3 second baad hide
  }
}
