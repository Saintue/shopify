import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Product } from '../../../interfaces/product';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NotificationService } from '../../../services/notification/notification.service';
import { ProductEditorService } from '../../../services/productEditorService/product-editor.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sf-product-editor',
  standalone: true,
  imports: [NgForOf, ButtonModule, TableModule, AsyncPipe, NgIf],
  templateUrl: './product-editor.component.html',
  styleUrl: './product-editor.component.scss',
})
export class ProductEditorComponent {
  constructor(
    private notifService: NotificationService,
    private editor: ProductEditorService,
    private http: HttpClient
  ) {}
  products$ = this.http.get<Product[]>('http://localhost:4000/api/goods');

  addProduct(): void {
    let name = 'abobobus';
    let quantity = 10;
    let price = 30;
    this.editor.addProductToList(name, quantity, price).subscribe(res => {
      this.notifService.success('what have you done!!!?');
      this.products$ = this.http.get<Product[]>(
        'http://localhost:4000/api/goods'
      );
    });
  }
  addToCart(name: string, quantity: number, price: number) {
    console.log(name, price);
    this.editor.addToCart(name, quantity, price);
  }
}
