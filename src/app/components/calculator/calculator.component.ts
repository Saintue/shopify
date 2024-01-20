import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'sf-calculator',
  standalone: true,
  imports: [ButtonModule, NgForOf],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  products = [
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

  createProduct() {
    this.products.push({
      name: `product${this.i++}`,
      quantity: Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 100),
    });
  }
}
