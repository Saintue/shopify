import { Component, OnInit } from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'sf-cart',
  standalone: true,
  imports: [NgForOf, TableModule, ButtonModule, NgIf, AsyncPipe],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
})
export class ProductCartComponent implements OnInit {
  constructor(protected cartService: CartService) {}
  ngOnInit() {}
  removeFromCart(product: string, quantity: number, price: number) {
  }
}
