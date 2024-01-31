import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject$ = new BehaviorSubject<Product[]>([]);
  cart$: Observable<Product[]>;
  constructor() {
    this.cart$ = this.cartSubject$.asObservable();
  }

  get cart(): Product[] {
    return this.cartSubject$.value;
  }

  set cart(products: Product[]) {
    this.cartSubject$.next(products);
  }

  addToCart(newProduct: Product) {
    const products = [...this.cartSubject$.value, newProduct];
    this.cartSubject$.next(products);
  }
}
