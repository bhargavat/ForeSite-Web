import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userName: string;
  private password: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    console.log("username is:");
    console.log(user.userName);
    console.log("Password is:");
    console.log(user.password);
    this.userName = user.userName;
    this.password = user.password;
    this.loggedIn.next(true);
    this.router.navigate(['/']);

    // if (user.userName !== '' && user.password !== '' ) {
    //   this.loggedIn.next(true);
    //   this.router.navigate(['/']);
    // }
  }

  getUsername(){
    if (this.loggedIn.asObservable()){
      return this.userName;
    }
    return "";
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}