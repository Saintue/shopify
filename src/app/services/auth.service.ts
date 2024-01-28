import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) {}
  giveLoginState() {
    this.fire.emit(true);
  }
  Login() {
    return this.fire;
  }

  showRegister(value: boolean): boolean {
    return (value = true);
  }

  showLogin(value: boolean): boolean {
    return (value = true);
  }

  logOut() {
    return false;
  }

  registerUser(inputdata: any) {
    console.log(inputdata);
    return this.http.post('http://localhost:4000/api/user/register', inputdata);
  }

  loginUser(inputdata: any) {
    console.log(inputdata);
    return this.http.post('http://localhost:4000/api/user/login', inputdata);
  }
}
