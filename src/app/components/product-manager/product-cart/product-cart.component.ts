import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'sf-cart',
  standalone: true,
  imports: [NgForOf, TableModule, ButtonModule],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
})
export class ProductCartComponent {
  products = [
    { name: 'product1', quantity: 10, price: 10 },
    { name: 'product2', quantity: 20, price: 30 },
    { name: 'product3', quantity: 50, price: 160 },
    { name: 'product4', quantity: 110, price: 130 },
    { name: 'product1', quantity: 10, price: 10 },
    { name: 'product2', quantity: 20, price: 30 },
    { name: 'product3', quantity: 50, price: 160 },
    { name: 'product4', quantity: 110, price: 130 },
    { name: 'product1', quantity: 10, price: 10 },
    { name: 'product2', quantity: 20, price: 30 },
    { name: 'product3', quantity: 50, price: 160 },
    { name: 'product4', quantity: 110, price: 130 },
    { name: 'product1', quantity: 10, price: 10 },
    { name: 'product2', quantity: 20, price: 30 },
    { name: 'product3', quantity: 50, price: 160 },
    { name: 'product4', quantity: 110, price: 130 },
    { name: 'product1', quantity: 10, price: 10 },
    { name: 'product2', quantity: 20, price: 30 },
    { name: 'product3', quantity: 50, price: 160 },
    { name: 'product4', quantity: 110, price: 130 },
    { name: 'product1', quantity: 10, price: 10 },
    { name: 'product2', quantity: 20, price: 30 },
    { name: 'product3', quantity: 50, price: 160 },
    { name: 'product4', quantity: 110, price: 130 },
  ];
}
