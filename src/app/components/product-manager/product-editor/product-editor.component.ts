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
import {UpdateProductComponent} from "./update-product/update-product.component";

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
    UpdateProductComponent,
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
  updateProductVisible:boolean = false;

  getProduct(name:string){
    this.productEditorService.getProduct(name)
  }
  showEdit(){
    this.updateProductVisible = true;
  }
  showAddProduct() {
    this.addProductVisible = true;
  }

  addProductToCart(product: Product): void {
    this.cartService.addToCart(product)
  }
 removeProduct(product:Product) {
   this.productEditorService.removeProduct(product);
  }
}
