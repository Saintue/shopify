import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AutoFocusModule } from 'primeng/autofocus';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';

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
export class HeaderComponent implements OnInit {
  loggedIn = !!localStorage.getItem('loggedIn');
  constructor(private authService: AuthService) {}
  registerVisible: boolean = false;
  loginVisible: boolean = false;
  showRegister(): void {
    this.registerVisible = this.authService.showRegister(this.registerVisible);
  }
  showLogin(): void {
    this.loginVisible = this.authService.showLogin(this.loginVisible);
  }
  logOut(): void {
    this.loggedIn = this.authService.logOut();
  }

  ngOnInit() {
    this.authService.Login().subscribe(item => (this.loggedIn = item));
  }
}
