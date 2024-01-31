import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { CartProduct } from '../interfaces/cartProduct/cart-product';
import { ProductHttpService } from './http/product-http.service';
import { NotificationService } from './notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProductEditorService {
  private productsSubject$ = new BehaviorSubject<Product[] | null>(null);
  products$: Observable<Product[] | null>;

  private cartItemList: CartProduct[] = [];
  private cartProductList = new BehaviorSubject<CartProduct[]>([]);
  private productPositiveList: Product[] = [];
  constructor(
    private productHttpService: ProductHttpService,
    private notificationService: NotificationService
  ) {
    this.products$ = this.productsSubject$.asObservable();

    if (this.productsSubject$.value === null) {
      this.productHttpService.getProducts().subscribe({
        next: (products: Product[]) => {
          this.productsSubject$.next(products);
        },
        error: () => {
          this.notificationService.error('Something went wrong');
        },
      });
    }
  }


  removeProduct(productToRemove: Product) {
    const newProducts: Product[] = this.productsSubject$.value!.filter((product)=>{
      return product.id !== productToRemove.id
    })

    this.productsSubject$.next(newProducts)
  }

  getProductCartList() {
    return this.cartProductList.asObservable();
  }

  addToCart(product: Product) {
    const {name, quantity, price, id} = product
    if (quantity === 0) return
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
        this.cartItemList.push({ name, quantity: 1, price });
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

  removeFromApp(name: string) {
    for (let i = 0; i <= this.productPositiveList.length; i++) {
      if (this.productPositiveList[i].name === name) {
        this.productPositiveList.splice(i, 1);
        /*        this.productList.next(this.productPositiveList);*/
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

/*  DeleteProductFromDataBaseList(id: string) {
    return this.http.delete(`http://localhost:4000/api/goods/${id}`);
  }*/

  addProductToList(name: string, quantity: number, price: number, id: string) {
    this.productPositiveList.push({
      name: name,
      quantity: quantity,
      price: price,
      id: id,
    });
    /*    this.productList.next(this.productPositiveList);
    console.log(this.productList);*/
  }
}
