import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const loginUrl = '/foresite/login';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  login_info = { 
    user_name: "",
    password: ""
   };

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  loginInfo(user:Object): Observable<any> {
    return this.http.post<any>(loginUrl, user, httpOptions);
  }

  login(user: User) {
    console.log("username is:");
    console.log(user.userName);
    console.log("Password is:");
    console.log(user.password);
    
    this.login_info["user_name"] = user.userName;
    this.login_info["password"] = user.password;

    this.loginInfo(this.login_info).subscribe(response => {
      if(response.response === 'success'){
        this.loggedIn.next(true);
        this.router.navigate(['/']);
        return true;
    }
    })
    return false;
  }

  getUsername(){
    if (this.loggedIn.asObservable()){
      return this.login_info["user_name"];
    }
    return "";
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}