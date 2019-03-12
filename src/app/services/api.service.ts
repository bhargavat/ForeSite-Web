import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
//import { User } from '../models/user'

const apiURL: string = 'http://127.0.0.1:5000/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  public login(user: any): Observable<any> {
    console.log("user: "+user);
    let req = JSON.stringify(user)
    console.log(req);
    //return this.http.post(apiURL+'foresite/login', req, httpOptions).pipe(map((response: Response) => response.json);
    return this.http.post<string>(apiURL+'foresite/login', user, httpOptions)
    .pipe(
      catchError(this.handleError('login', user))
    );
  }

  public create_user(user: any): Observable<any> {
    //console.log("user: "+user);
    let req = JSON.stringify(user)
    console.log("user: "+req);
    //return this.http.post(apiURL+'foresite/login', req, httpOptions).pipe(map((response: Response) => response.json);
    return this.http.post<string>(apiURL+'foresite/createUser', req, httpOptions)
    .pipe(
      catchError(this.handleError('login', user))
    );
  }
  
  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

