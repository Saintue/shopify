import {Component, DestroyRef} from '@angular/core';
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
import { ProductEditorService } from '../../../../services/product-editor.service';
import { of, pipe } from 'rxjs';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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
    private editor: ProductEditorService,
    private destroyRef: DestroyRef
  ) {
    this.addProductForm = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
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

    const formData = this.addProductForm.value;
    of(formData).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({

    });
  }
}
