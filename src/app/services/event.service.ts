import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

const getEventUrl = "/foresite/getUserCreatedEvents";
const getEventDetail = "/foresite/getEventDetails";

@Injectable({
  providedIn: "root"
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvent(userInfo: Object): Observable<any> {
    return this.http.post<any>(getEventUrl, userInfo, httpOptions);
  }

  getEventDetails(event_id: Object): Observable<any> {
    return this.http.post<any>(getEventDetail, event_id, httpOptions);
  }
}
