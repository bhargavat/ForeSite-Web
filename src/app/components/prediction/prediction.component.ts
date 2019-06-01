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
    attendance_total: 0,
    add_ons: [],
    add_ons_total: [],
    survey_prediction: [],
    survey_prediction_total: []
  };

  survey_prediction = [];

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
    this.attendance_prediction.push(attend_total);
    this.attendance_prediction.push(attend_pred);

    // Add On Prediction
    let add_on_total = [];
    let add_on_pred = [];
    let labels = [];
    for (let a of this.info.add_ons) {
      this.add_on_create_data(add_on_total, add_on_pred, labels, a.name);
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
    this.add_ons_prediction.push(addOnTotal);
    this.add_ons_prediction.push(addOnPred);
    this.addOnLabels = labels;

    // Survey Prediction

    for (let s of this.info.survey_prediction_total) {
      if (s.type != "freeResponse") {
        let survey_total = [];
        let survey_pred = [];
        let labels = [];
        for (let ans of s.answers) {
          for (var key in ans) {
            this.survey_create_data(
              survey_total,
              survey_pred,
              labels,
              s.question,
              key
            );
          }
        }
        let total = {
          data: survey_total,
          label: "Total"
        };

        let expected = {
          data: survey_pred,
          label: "Expected"
        };

        let mainObj = {
          question: s.question,
          labels: labels,
          type: 'choice',
          data: []
        };
        mainObj.data.push(total);
        mainObj.data.push(expected);
        this.survey_prediction.push(mainObj);
      }
      else{
        let mainObj = {
          question: s.question,
          type: 'freeResponse',
          data: s.answers
        };
        this.survey_prediction.push(mainObj);
      }
    }

    console.log(this.survey_prediction);
  }

  survey_create_data(survey_total, survey_pred, labels, question, answer) {
    labels.push(answer);
    for (let s of this.info.survey_prediction_total) {
      if (s.question == question) {
        for (let key in s.answers) {
          for (let k in s.answers[key]) {
            if (k == answer) {
              survey_total.push(s.answers[key][k]);
            }
          }
        }
      }
    }
    for (let s of this.info.survey_prediction) {
      if (s.question == question) {
        for (let key in s.answers) {
          for (let k in s.answers[key]) {
            if (k == answer) {
              survey_pred.push(s.answers[key][k]);
            }
          }
        }
      }
    }
  }

  add_on_create_data(add_on_total, add_on_pred, labels, name) {
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
    info["add_ons"] = response["add_ons"];
    info["add_ons_total"] = response["add_ons_total"];
    info["survey_prediction"] = response["survey_prediction"];
    info["survey_prediction_total"] = response["survey_prediction_total"];
  }
}
