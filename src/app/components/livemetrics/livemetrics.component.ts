import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../../services/event.service";
import { DomSanitizer } from "@angular/platform-browser";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: "app-livemetrics",
  templateUrl: "./livemetrics.component.html",
  styleUrls: ["./livemetrics.component.css"]
})
export class LivemetricsComponent implements OnInit {
  info = {
    attendance_prediction: 0,
    attendance_total: 0,
    attendance_live: 0,
    add_ons: [],
    add_ons_total: [],
    add_ons_live: []
  };

  event_id = "";

  barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0
          }
        }
      ]
    }
  };

  barChartType: ChartType = "bar";
  barChartLegend = true;

  barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" }
  ];

  attendanceLabels: Label[] = ["Attendance Prediction"];
  addOnLabels: Label[] = [""];

  attendance_prediction: ChartDataSets[] = [{ data: [0], label: "" }];
  add_ons_prediction: ChartDataSets[] = [{ data: [0], label: "" }];

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

  map_data() {
    // Attendance Prediction
    this.attendance_prediction = [];
    let attend_total = {
      data: [],
      label: "Total Registered"
    };
    attend_total.data.push(this.info.attendance_total);
    let attend_pred = {
      data: [],
      label: "Predicted Attendance"
    };
    attend_pred.data.push(this.info.attendance_prediction);
    let attend_live = {
      data: [],
      label: "Actual Attendance"
    };
    attend_live.data.push(this.info.attendance_live);
    this.attendance_prediction.push(attend_total);
    this.attendance_prediction.push(attend_pred);
    this.attendance_prediction.push(attend_live);

    // Add On Prediction
    let add_on_total = [];
    let add_on_pred = [];
    let add_on_live = [];
    let labels = [];
    for (let a of this.info.add_ons) {
      this.add_on_create_data(
        add_on_total,
        add_on_pred,
        add_on_live,
        labels,
        a.name
      );
    }
    this.add_ons_prediction = [];
    let addOnTotal = {
      data: add_on_total,
      label: "Total"
    };
    let addOnPred = {
      data: add_on_pred,
      label: "Expected"
    };
    let addOnLive = {
      data: add_on_live,
      label: "Actual"
    };
    this.add_ons_prediction.push(addOnTotal);
    this.add_ons_prediction.push(addOnPred);
    this.add_ons_prediction.push(addOnLive);
    this.addOnLabels = labels;
    console.log(this.add_ons_prediction);
  }

  add_on_create_data(add_on_total, add_on_pred, add_on_live, labels, name) {
    labels.push(name);
    for (let a of this.info.add_ons) {
      if (a.name == name) {
        add_on_pred.push(a.quantity);
      }
    }
    for (let a of this.info.add_ons_total) {
      if (a.name == name) {
        add_on_total.push(a.quantity);
      }
    }
    for (let a of this.info.add_ons_live) {
      if (a.name == name) {
        add_on_live.push(a.quantity);
      }
    }
  }

  refresh() {
    this.getEventDetails(this.event_id);
  }

  getEventDetails(id: any): void {
    this.event_id = id;
    const query = {
      event_id: id
    };
    this.eventService.getEventDetails(query).subscribe(response => {
      if (response.response === "success") {
        this.collect_response(this.info, response.results);
        this.map_data();
      }
    });
  }

  collect_response(info: any, response: any) {
    info["attendance_prediction"] = response["attendance_prediction"];
    info["attendance_total"] = response["attendance_total"];
    info["attendance_live"] = response["attendance_live"];
    info["add_ons"] = response["add_ons"];
    info["add_ons_total"] = response["add_ons_total"];
    info["add_ons_live"] = response["add_ons_live"];
    info["survey_prediction"] = response["survey_prediction"];
    info["survey_prediction_total"] = response["survey_prediction_total"];
  }
}
