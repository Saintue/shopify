import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
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
import { HeaderComponent } from '../header/header.component';

interface LoginForm
  extends FormGroup<{
    password: FormControl<string>;
    mail: FormControl<string>;
  }> {}
@Component({
  selector: 'sf-login',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    LoadingComponent,
    NgIf,
    ReactiveFormsModule,
    HeaderComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: LoginForm;

  constructor(
    private formBuilder: FormBuilder,
    private notifService: NotificationService,
    private Authencticate: AuthService,
    private loading: LoadingService
  ) {
    this.loginForm = this.formBuilder.nonNullable.group({
      password: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.loading.startLoading();
    if (this.loginForm.valid) {
      console.log('submit data', this.loginForm.value);
      this.Authencticate.loginUser({
        email: this.loginForm.value.mail,
        password: this.loginForm.value.password,
      }).subscribe(
        res => {
          this.notifService.success('login successfull');
          this.loading.stopLoading();
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('currentUser', `${this.loginForm.value.mail}`);
          this.Authencticate.giveLoginState();
          localStorage.setItem('userData', `${JSON.stringify(res)}`);
        },
        err => {
          console.log(err);
          this.notifService.error(err.error.message);
          this.loading.stopLoading();
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
      this.notifService.error('Invalid form data');
      this.loading.stopLoading();
    }
  }
}
