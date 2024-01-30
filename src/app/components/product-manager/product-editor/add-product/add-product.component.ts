import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoadingComponent } from '../../../../services/loading/loading.component';
import { NgIf } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../../../../services/notification/notification.service';
import { LoadingService } from '../../../../services/loading/loading.service';
import { ProductEditorService } from '../../../../services/productEditorService/product-editor.service';

interface AddProductForm
  extends FormGroup<{
    name: FormControl<string>;
    quantity: FormControl<number>;
    price: FormControl<number>;
  }> {}
@Component({
  selector: 'sf-add-product',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    LoadingComponent,
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  addProductForm: AddProductForm;

  constructor(
    private formBuilder: FormBuilder,
    private notifService: NotificationService,
    private loading: LoadingService,
    private editor: ProductEditorService
  ) {
    this.addProductForm = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
      price: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }
  onSubmit(): void {
    this.loading.startLoading();
    if (this.addProductForm.valid) {
      this.editor
        .addProductToDataBaseList(
          (this.addProductForm.value.name || '').toString(),
          +(this.addProductForm.value.quantity || ''),
          +(this.addProductForm.value.price || '')
        )
        .subscribe(
          res => {
            let currentObj = JSON.parse(JSON.stringify(res));
            console.log(currentObj.id);
            this.editor.addProductToList(
              (this.addProductForm.value.name || '').toString(),
              +(this.addProductForm.value.quantity || ''),
              +(this.addProductForm.value.price || ''),
              currentObj.id
            );
            this.loading.stopLoading();
            this.notifService.success('Product added successfully');
          },
          err => {
            this.notifService.error(err.error.message);
            this.loading.stopLoading();
          }
        );
    } else {
      this.addProductForm.markAllAsTouched();
      this.notifService.error('Invalid form data');
      this.loading.stopLoading();
    }
  }
}
