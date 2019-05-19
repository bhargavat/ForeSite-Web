import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../../services/event.service";
import { DomSanitizer } from "@angular/platform-browser";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: "app-prediction",
  templateUrl: "./prediction.component.html",
  styleUrls: ["./prediction.component.css"]
})
export class PredictionComponent implements OnInit {
  info = {
    attendance_prediction: 0,
    attendance_total: 0
  };
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
  barChartLabels: Label[] = ["Attendance Prediction"];
  barChartType: ChartType = "bar";
  barChartLegend = true;

  barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" }
  ];

  attendance_prediction: ChartDataSets[] = [{ data: [0], label: "" }];

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
    this.attendance_prediction.push(attend_total);
    this.attendance_prediction.push(attend_pred);
    console.log(this.attendance_prediction);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === "bar" ? "pie" : "bar";
  }

  getEventDetails(id: any): void {
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
  }
}
