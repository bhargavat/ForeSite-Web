import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const userInfoUrl = '/foresite/getUserDetails';
const updatUserInfoUrl = '/foresite/editUserDetails';

@Injectable({
  providedIn: 'root'
})

export class UserInfoService {

  constructor(private http: HttpClient) {
    
  }

  getUserInfo(userInfo:Object): Observable<any> {
    return this.http.post<any>(userInfoUrl, userInfo, httpOptions);
  }

  updateUser(userInfo:Object): Observable<any> {
    return this.http.post<any>(updatUserInfoUrl, userInfo, httpOptions);
  }
}
