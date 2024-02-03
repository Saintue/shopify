import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:4000/api/goods');
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      'http://localhost:4000/api/goods/',
      product
    );
  }

  removeProduct(product: Product) {
    return this.httpClient.delete<Product>(
      `http://localhost:4000/api/goods/${product.id}`
    );
  }

  editProduct(product: Product) {
    console.log(product.id)
    return this.httpClient.put<Product>(`http://localhost:4000/api/goods/`, [
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      }
    ]);
  }
}
