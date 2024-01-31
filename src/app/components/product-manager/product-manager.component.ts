import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NgForOf } from '@angular/common';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { LoadingComponent } from '../../services/loading/loading.component';

@Component({
  selector: 'sf-product-manager',
  standalone: true,
  imports: [
    ButtonModule,
    NgForOf,
    ProductEditorComponent,
    ProductCartComponent,
    LoadingComponent,
  ],
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.scss',
})
export class ProductManagerComponent {}
