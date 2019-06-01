import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

const createEventUrl = "/foresite/createEvent";

@Injectable({
  providedIn: "root"
})
export class CreateService {
  constructor(private http: HttpClient) {}

  createEvent(query: Object): Observable<any> {
    return this.http.post<any>(createEventUrl, query, httpOptions);
  }
}
