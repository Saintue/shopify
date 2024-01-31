import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Product } from '../../../interfaces/product';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NotificationService } from '../../../services/notification/notification.service';
import { ProductEditorService } from '../../../services/productEditorService/product-editor.service';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'sf-product-editor',
  standalone: true,
  imports: [
    NgForOf,
    ButtonModule,
    TableModule,
    AsyncPipe,
    NgIf,
    DialogModule,
    AddProductComponent,
  ],
  templateUrl: './product-editor.component.html',
  styleUrl: './product-editor.component.scss',
})
export class ProductEditorComponent implements OnInit {
  constructor(
    private notifService: NotificationService,
    private editor: ProductEditorService,
    private http: HttpClient
  ) {}
  addProductVisible = false;
  products: Product[] = [];
  showAddProduct() {
    this.addProductVisible = true;
  }
  addToCart(name: string, quantity: number, price: number) {
    console.log(name, price);
    this.editor.addToCart(name, quantity, price);
  }

  removeFromDB(name: string, id: string) {
    this.editor.DeleteProductFromDataBaseList(id).subscribe(res => {
      this.notifService.success('removed successfully');
      this.editor.removeFromApp(name);
    });
  }

  ngOnInit() {
    this.editor.getProductList().subscribe(res => {
      this.products = res;
    });
  }

  protected readonly console = console;
}
