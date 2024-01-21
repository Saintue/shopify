import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  showRegister(value: boolean): boolean {
    return (value = true);
  }
  showLogin(value: boolean): boolean {
    return (value = true);
  }

  logOut(value: boolean): boolean {
    return (value = false);
  }
}
