import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductEditorService {
  private cartItemList: Product[] = [];
  private productList = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.productList.asObservable();
  }
  addToCart(name: string, quantity: number, price: number) {
    if (quantity === 0) {
      return;
    }
    for (let i = 0; i <= this.cartItemList.length; i++) {
      if (this.cartItemList[i] !== undefined) {
        if (this.cartItemList[i].name === name) {
          if (this.cartItemList[i].quantity === quantity) {
            break;
          } else {
            this.cartItemList[i].quantity += 1;
            console.log(this.cartItemList);
            break;
          }
        }
      }
      if (this.cartItemList[i] === undefined) {
        this.cartItemList.push({ name: name, quantity: 1, price: price });
        this.productList.next(this.cartItemList);
        break;
      }
    }
  }

  removeFromCart(name: string, quantity: number, price: number) {
    for (let i = 0; i <= this.cartItemList.length; i++) {
      if (this.cartItemList[i].name === name) {
        if (this.cartItemList[i].quantity === 1) {
          this.cartItemList.splice(i, 1);
          this.productList.next(this.cartItemList);
          break;
        } else {
          this.cartItemList[i].quantity -= 1;
          this.productList.next(this.cartItemList);
          break;
        }
      }
    }
  }

  getData() {
    return this.http.get('http://localhost:4000/api/goods');
  }

  addProductToList(name: string, quantity: number, price: number) {
    return this.http.post('http://localhost:4000/api/goods/', {
      name: name,
      quantity: quantity,
      price: price,
    });
  }
}
