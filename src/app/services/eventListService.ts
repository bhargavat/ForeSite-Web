import { Injectable } from "@angular/core";
import { AuthService } from "../components/auth/auth.service";
import { EventService } from "../services/event.service";

@Injectable()
export class eventListService {
  data: any;
  user_name: any;
  eventList = [];

  constructor(
    private authService: AuthService,
    private eventService: EventService
  ) {}

  getEvent(): void {
    this.user_name = this.authService.getUsername();
    console.log("userInfo=", this.user_name);
    let query = {
      user_name: this.user_name
    };
    this.eventService.getEvent(query).subscribe(response => {
      if (response.response === "success") {
        this.eventList = response.results;
      }
    });
  }
}
