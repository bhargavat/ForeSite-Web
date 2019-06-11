import { Component, OnInit } from "@angular/core";
import { Contact } from "src/app/model/contact";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";

import { fromEventPattern } from "rxjs";
import { NgForm } from "@angular/forms";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../components/auth/auth.service";
import { CreateService } from "../services/create.service";
import { eventListService } from "../services/eventListService";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  userInfo = {
    user_name: ""
  };
  event = {
    user_name: "",
    title: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    start_time: "",
    start_date: "",
    end_time: "",
    end_date: "",
    is_tbd: 0,
    category: "",
    thumbnail_icon: "",
    description: "",
    max_purchase_quantity: 0,
    max_quantity_available: 0,
    subtotal_price: 0,
    add_ons: [],
    survey_questions: []
  };

  subtotal_dollars = 0.01;
  start_time = { hour: 13, minute: 30 };
  end_time = { hour: 13, minute: 30 };
  meridian = true;
  survey = [];
  addOns = [];

  event_id = "";

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private createService: CreateService,
    calendar: NgbCalendar,
    private commonEventList: eventListService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }

  ngOnInit() {}

  addAddOn() {
    var item = {
      name: "",
      price: 0
    };
    this.addOns.push(item);
  }

  addAnswer(s) {
    var item = {
      answer: ""
    };
    s.answers.push(item);
  }

  addSurvey() {
    var item = {
      question: "",
      type: "singleChoice",
      answers: []
    };
    this.survey.push(item);
  }

  onSubmit() {
    this.event["user_name"] = this.authService.getUsername();

    // Start and end time
    this.event["start_time"] =
      this.start_time.hour + ":" + this.start_time.minute;
    this.event["end_time"] = this.end_time.hour + ":" + this.end_time.minute;

    // Start and end date
    this.event["start_date"] =
      this.fromDate.month + "-" + this.fromDate.day + "-" + this.fromDate.year;
    if (this.toDate == null) {
      this.event["end_date"] =
        this.fromDate.month +
        "-" +
        this.fromDate.day +
        "-" +
        this.fromDate.year;
    } else {
      this.event["end_date"] =
        this.toDate.month + "-" + this.toDate.day + "-" + this.toDate.year;
    }

    // Add ons
    this.event["add_ons"] = this.addOns;

    // Survey
    for (let obj of this.survey) {
      let new_answers = [];
      let answers = obj["answers"];
      for (let a of answers) {
        new_answers.push(a["answer"]);
      }
      obj["answers"] = new_answers;
    }
    this.event["survey_questions"] = this.survey;

    this.createService.createEvent(this.event).subscribe(response => {
      if (response.response === "success") {
        this.event_id = response.event_id;
        console.log(this.event_id);
        this.commonEventList.getEvent();
        this.router.navigateByUrl("/event/" + this.event_id);
      }
    });
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
}
