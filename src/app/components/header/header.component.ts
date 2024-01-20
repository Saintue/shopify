import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AutoFocusModule } from 'primeng/autofocus';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'sf-header',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    AutoFocusModule,
    BrowserAnimationsModule,
    RegisterComponent,
    LoginComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  registerVisible: boolean = false;
  loginVisible: boolean = false;
  loggedIn: boolean = true;
  showRegister() {
    this.registerVisible = true;
  }
  showLogin() {
    this.loginVisible = true;
  }

  logOut() {
    this.loggedIn = false;
  }
}
