import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, Observable} from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductHttpService } from './http/product-http.service';
import { NotificationService } from './notification/notification.service';
import { LoadingService } from './loading/loading.service';
import {CartService} from "./cart.service";

@Injectable({
  providedIn: 'root',
})
export class ProductEditorService {
  private productsSubject$ = new BehaviorSubject<Product[] | null>(null);
  products$: Observable<Product[] | null>;
  productToEdit:any = [];
  constructor(
    private productHttpService: ProductHttpService,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private cartService: CartService,
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
    this.loadingService.startLoading();
    this.productHttpService.removeProduct(productToRemove).subscribe({
      next: () => {
        const newProducts: Product[] = this.productsSubject$.value!.filter(
          product => {
            return product.id !== productToRemove.id;
          }
        );
        this.productsSubject$.next(newProducts);
      },
      error: err => {
        this.notificationService.error(err.error.message);
        this.loadingService.stopLoading();
      },
      complete: () => {
        this.cartService.remove(productToRemove)
        this.loadingService.stopLoading();
      },
    });
  }

  createProduct(newProduct: Product) {
    this.loadingService.startLoading();
    this.productHttpService.createProduct(newProduct).subscribe({
      next: (product: Product) => {
        console.log(product);
        const newProducts: Product[] = [
          ...this.productsSubject$.value!,
          product,
        ];
        this.productsSubject$.next(newProducts);
      },
      error: err => {
        this.notificationService.error(err.error.message);
        this.loadingService.stopLoading();
      },
      complete: () => {
        this.loadingService.stopLoading();
      },
    });
  }

  editProduct(productToChange:Product){
    this.productHttpService.editProduct(productToChange).subscribe({
      next: () => {
        const products: Product[] = [...this.productsSubject$.value!]
        products[products.findIndex(el => el.id === productToChange.id)] = productToChange;
        this.productsSubject$.next(products)
      },
      error: (err) =>{
        this.notificationService.error(err.error.message);
      },
      complete: () =>{
        this.cartService.remove(productToChange);
        this.notificationService.success('product changed successfully')
      }
    })
  }
  getProduct(name:string){
    const products: Product[] = [...this.productsSubject$.value!]
    this.productToEdit = products.find(el => el.name === name)
    console.log(this.productToEdit)
    return this.productToEdit;
  }
}
