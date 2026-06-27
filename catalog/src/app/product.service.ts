// ProductService — Spring Boot backend se products fetch karta hai
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models/product'; // same app/ folder mein hai

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  // GET /api/products — saare products laata hai
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
