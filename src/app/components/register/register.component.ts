import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { NotificationService } from '../../services/notification/notification.service';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading/loading.service';
import { LoadingComponent } from '../../services/loading/loading.component';

interface RegisterForm
  extends FormGroup<{
    password: FormControl<string>;
    confirm: FormControl<string>;
    mail: FormControl<string>;
  }> {}
@Component({
  selector: 'sf-register',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    NgIf,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: RegisterForm;

  constructor(
    private formBuilder: FormBuilder,
    private notifService: NotificationService,
    private Authencticate: AuthService,
    private loading: LoadingService
  ) {
    this.registerForm = this.formBuilder.nonNullable.group(
      {
        password: ['', Validators.required],
        confirm: ['', Validators.required],
        mail: ['', [Validators.required, Validators.email]],
      },
      {
        validators: this.confirmPassword('password', 'confirm'),
      }
    );
  }
  private confirmPassword(password: string, confirm: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const passwordValue = form.get(password)?.value;
      const confirmValue = form.get(confirm)?.value;
      if (passwordValue === confirmValue) {
        return null;
      }
      return { passwordMissMatch: true };
    };
  }

  onSubmit(): void {
    this.loading.startLoading();
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      this.notifService.error('Invalid form data');
      this.loading.stopLoading();
      return
    }
      this.Authencticate.registerUser({
        email: this.registerForm.value.mail,
        password: this.registerForm.value.password,
      }).subscribe(
        res => {
          this.notifService.success('registered successfully');
          this.loading.stopLoading();
        },
        err => {
          this.notifService.error(err.error.message);
          this.loading.stopLoading();
        }
      );
  }
}
