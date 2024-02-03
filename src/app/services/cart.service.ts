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
  addToCart(newProduct: Product) {
    if (newProduct.quantity === 0) return;
    const cartProducts = [...this.cartSubject$.value];
    let productToAddIndex = cartProducts.findIndex(
      el => el.name === newProduct.name
    );
    if (cartProducts[productToAddIndex] !== undefined) {
      if (cartProducts[productToAddIndex].quantity === newProduct.quantity)
        return;
    }
    if (productToAddIndex !== -1) {
      cartProducts[productToAddIndex].quantity += 1;
    } else {
      let productToAdd: Product = {
        name: newProduct.name,
        quantity: 1,
        price: newProduct.price,
        id: newProduct.id,
      };
      cartProducts.push(productToAdd);
    }
    this.cartSubject$.next(cartProducts);
  }
  removeFromCart(newProduct: Product) {
    const cartProducts = [...this.cartSubject$.value];
    let productToRemove = cartProducts.findIndex(
      el => el.name === newProduct.name
    );
    cartProducts[productToRemove].quantity -= 1;
    if (cartProducts[productToRemove].quantity === 0)
      cartProducts.splice(productToRemove, 1);
    this.cartSubject$.next(cartProducts);
  }
  remove(product: Product) {
    const cartProducts = [...this.cartSubject$.value];
    let productToRemove = cartProducts.findIndex(
      el => el.name === product.name
    );
    cartProducts.splice(productToRemove, 1);
    this.cartSubject$.next(cartProducts);
  }
}
