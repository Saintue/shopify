import { Injectable } from '@angular/core';
import {Product} from "../../interfaces/product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:4000/api/goods')
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>('http://localhost:4000/api/goods/', product);
  }
}
