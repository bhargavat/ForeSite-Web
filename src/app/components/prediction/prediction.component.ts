import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../../services/event.service";
import { DomSanitizer } from "@angular/platform-browser";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-prediction",
  templateUrl: "./prediction.component.html",
  styleUrls: ["./prediction.component.css"]
})
export class PredictionComponent implements OnInit {
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
    this.eventService.getEventDetails(query).subscribe(response => {
      if (response.response === "success") {
        this.collect_response(this.event_info, response.results);
      }
      console.log(this.event_info);
    });
  }

  collect_response(info: any, response: any) {
    info["title"] = response["title"];
    info["start_date"] = response["start_date"];
    info["start_time"] = response["start_time"];
    info["end_date"] = response["end_date"];
    info["end_time"] = response["end_time"];

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
}
