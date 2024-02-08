import { Component, DestroyRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoadingComponent } from '../../../../services/loading/loading.component';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../../../../services/notification/notification.service';
import { LoadingService } from '../../../../services/loading/loading.service';
import { ProductEditorService } from '../../../../services/product-editor.service';

interface AddProductForm
  extends FormGroup<{
    name: FormControl<string>;
    quantity: FormControl<number>;
    price: FormControl<number>;
  }> {}
@Component({
  selector: 'sf-update-product',
  standalone: true,
    imports: [
        ButtonModule,
        InputTextModule,
        LoadingComponent,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  addProductForm: AddProductForm;

  constructor(
    private formBuilder: FormBuilder,
    private notifService: NotificationService,
    private editor: ProductEditorService,
  ) {
    this.addProductForm = this.formBuilder.nonNullable.group({
      name: [``, Validators.required],
      quantity: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
      price: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }
  onSubmit(): void {
    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched();
      this.notifService.error('Invalid form data');
      return;
    }
    const formData = {
      name: this.addProductForm.value.name!,
      quantity: this.addProductForm.value.quantity!,
      price: this.addProductForm.value.price!,
      id: `${this.editor.productToEdit.id}`,
    };
    console.log(formData)
    this.editor.editProduct(formData);
  }
}
