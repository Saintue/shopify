import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NotificationService } from '../../../services/notification/notification.service';
import { DialogModule } from 'primeng/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductEditorService } from '../../../services/product-editor.service';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../services/cart.service';

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
  styleUrls: ['./product-editor.component.scss'],
})
export class ProductEditorComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    protected cartService: CartService,
    protected productEditorService: ProductEditorService
  ) {}

  ngOnInit(): void {}

  addProductVisible = false;
  showAddProduct() {
    this.addProductVisible = true;
  }

  addProductToCart(product: Product): void {
    this.productEditorService.removeProduct(product);
    this.cartService.addToCart(product)
  }

/*  removeFromDB(name: string, id: string) {
    this.productEditorService
      .DeleteProductFromDataBaseList(id)
      .subscribe(res => {
        this.notificationService.success('removed successfully');
        this.productEditorService.removeFromApp(name);
      });
  }*/
}
