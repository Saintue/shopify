import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProductEditorService } from '../../../services/productEditorService/product-editor.service';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'sf-cart',
  standalone: true,
  imports: [NgForOf, TableModule, ButtonModule],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
})
export class ProductCartComponent implements OnInit {
  products: Product[] = [];
  constructor(private editor: ProductEditorService) {}
  ngOnInit() {
    this.editor.getProducts().subscribe(res => {
      this.products = res;
    });
  }
  removeFromCart(product: string, quantity: number, price: number) {
    this.editor.removeFromCart(product, quantity, price);
  }
}
