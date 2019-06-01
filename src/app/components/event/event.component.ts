import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../../services/event.service";
import { DomSanitizer } from "@angular/platform-browser";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"]
})
export class EventComponent implements OnInit {
  event_info = {
    title: "",
    start_date: "",
    start_time: "",
    start_date_time_formatted: "",
    end_date: "",
    end_time: "",
    end_date_time_formatted: "",

    location1: "",
    location2: "",

    details: ""
  };

  event_id = "";

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.getEventDetails(params["event_id"])
    );
  }

  getEventDetails(id: any): void {
    const query = {
      event_id: id
    };
    this.event_id = id;
    this.eventService.getEventDetails(query).subscribe(response => {
      if (response.response === "success") {
        this.collect_response(this.event_info, response.results);
      }
    });
  }

  collect_response(info: any, response: any) {
    info["title"] = response["title"];
    info["start_date"] = response["start_date"];
    info["start_time"] = response["start_time"];
    info["end_date"] = response["end_date"];
    info["end_time"] = response["end_time"];

    info["start_date_time_formatted"] = this.parse(
      response["start_date"],
      response["start_time"]
    );
    info["end_date_time_formatted"] = this.parse(
      response["end_date"],
      response["end_time"]
    );

    info["location2"] =
      response["street"] +
      ", " +
      response["city"] +
      ", " +
      response["state"] +
      ", " +
      response["zip_code"];
    info["details"] = response["description"];
  }

  parse(start_date: any, start_time: any) {
    const timestamp = Date.parse(start_date + " " + start_time);
    const date = new Date(timestamp);

    if (date.getDate() % 10 == 1 && Math.floor(date.getDate() / 10) != 1) {
      return (
        formatDate(date, "EEEE dd", "en-US") +
        "st" +
        formatDate(date, " MMMM yyyy hh:mma", "en-US")
      );
    } else if (
      date.getDate() % 10 == 2 &&
      Math.floor(date.getDate() / 10) != 1
    ) {
      return (
        formatDate(date, "EEEE dd", "en-US") +
        "nd" +
        formatDate(date, " MMMM yyyy hh:mma", "en-US")
      );
    } else if (
      date.getDate() % 10 == 3 &&
      Math.floor(date.getDate() / 10) != 1
    ) {
      return (
        formatDate(date, "EEEE dd", "en-US") +
        "rd" +
        formatDate(date, " MMMM yyyy hh:mma", "en-US")
      );
    } else {
      return (
        formatDate(date, "EEEE dd", "en-US") +
        "th" +
        formatDate(date, " MMMM yyyy hh:mma", "en-US")
      );
    }
  }
}
