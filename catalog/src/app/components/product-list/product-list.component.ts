import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: 2999, image: 'https://placehold.co/300x200?text=Headphones', category: 'Electronics', rating: 4.5 },
    { id: 2, name: 'Running Shoes', price: 1499, image: 'https://placehold.co/300x200?text=Shoes', category: 'Fashion', rating: 4.2 },
    { id: 3, name: 'Coffee Maker', price: 3499, image: 'https://placehold.co/300x200?text=Coffee+Maker', category: 'Home', rating: 4.7 },
    { id: 4, name: 'Smartphone Stand', price: 499, image: 'https://placehold.co/300x200?text=Stand', category: 'Electronics', rating: 4.0 },
    { id: 5, name: 'Backpack', price: 1999, image: 'https://placehold.co/300x200?text=Backpack', category: 'Fashion', rating: 4.3 },
    { id: 6, name: 'Desk Lamp', price: 899, image: 'https://placehold.co/300x200?text=Lamp', category: 'Home', rating: 4.1 },
  ];
}
