import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from './components/register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ProductManagerComponent } from './components/product-manager/product-manager.component';
import { HeaderComponent } from './components/header/header.component';
import { MessageService } from 'primeng/api';
import { NotificationComponent } from './services/notification/notification.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './services/loading/loading.component';

@NgModule({
  declarations: [AppComponent],
  providers: [MessageService],
  imports: [
    BrowserModule,
    ButtonModule,
    RegisterComponent,
    InputTextModule,
    FormsModule,
    LoginComponent,
    ProductManagerComponent,
    HeaderComponent,
    NotificationComponent,
    HttpClientModule,
    LoadingComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
