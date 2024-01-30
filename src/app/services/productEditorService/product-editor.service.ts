import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../interfaces/product';
import { CartProduct } from '../../interfaces/cartProduct/cart-product';

@Injectable({
  providedIn: 'root',
})
export class ProductEditorService {
  private cartItemList: CartProduct[] = [];
  private cartProductList = new BehaviorSubject<CartProduct[]>([]);
  private productList = new BehaviorSubject<Product[]>([]);
  private productPositiveList: Product[] = [];
  constructor(private http: HttpClient) {}

  getProductCartList() {
    return this.cartProductList.asObservable();
  }

  getProductList() {
    this.http
      .get<Product[]>('http://localhost:4000/api/goods')
      .subscribe(res => {
        this.productList.next(res);
        this.productPositiveList = res;
      });
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
        this.cartProductList.next(this.cartItemList);
        break;
      }
    }
  }

  removeFromCart(name: string, quantity: number, price: number) {
    for (let i = 0; i <= this.cartItemList.length; i++) {
      if (this.cartItemList[i].name === name) {
        if (this.cartItemList[i].quantity === 1) {
          this.cartItemList.splice(i, 1);
          this.cartProductList.next(this.cartItemList);
          break;
        } else {
          this.cartItemList[i].quantity -= 1;
          this.cartProductList.next(this.cartItemList);
          break;
        }
      }
    }
  }

  addProductToDataBaseList(name: string, quantity: number, price: number) {
    return this.http.post('http://localhost:4000/api/goods/', {
      name: name,
      quantity: quantity,
      price: price,
    });
  }

  removeFromApp(name: string) {
    for (let i = 0; i <= this.productPositiveList.length; i++) {
      if (this.productPositiveList[i].name === name) {
        this.productPositiveList.splice(i, 1);
        this.productList.next(this.productPositiveList);
        break;
      }
    }
    for (let i = 0; i <= this.cartItemList.length; i++) {
      if (this.cartItemList[i] !== undefined) {
        if (this.cartItemList[i].name === name) {
          this.cartItemList.splice(i, 1);
          this.cartProductList.next(this.cartItemList);
          break;
        }
      } else {
        break;
      }
    }
  }

  DeleteProductFromDataBaseList(id: string) {
    return this.http.delete(`http://localhost:4000/api/goods/${id}`);
  }

  addProductToList(name: string, quantity: number, price: number, id: string) {
    this.productPositiveList.push({
      name: name,
      quantity: quantity,
      price: price,
      id: id,
    });
    this.productList.next(this.productPositiveList);
    console.log(this.productList);
  }
}
