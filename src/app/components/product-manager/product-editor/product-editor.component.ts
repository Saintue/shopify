import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Product } from '../../../interfaces/product';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";

@Component({
  selector: 'sf-product-editor',
  standalone: true,
  imports: [NgForOf, ButtonModule, TableModule],
  templateUrl: './product-editor.component.html',
  styleUrl: './product-editor.component.scss',
})
export class ProductEditorComponent {
  products: Product[] = [
    { name: 'product1', quantity: 10, price: 10 },
    { name: 'product2', quantity: 20, price: 30 },
    { name: 'product3', quantity: 50, price: 160 },
    { name: 'product4', quantity: 110, price: 130 },
    { name: 'product5', quantity: 140, price: 10 },
    { name: 'product6', quantity: 106, price: 90 },
    { name: 'product7', quantity: 103, price: 50 },
    { name: 'product8', quantity: 2, price: 150 },
  ];

  i: number = 9;

  addProduct(): void {
    this.products.push({
      name: `product${this.i++}`,
      quantity: Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 100),
    });
  }
}
