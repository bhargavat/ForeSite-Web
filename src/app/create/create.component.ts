import { Component, OnInit } from "@angular/core";
import { Contact } from "src/app/model/contact";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";

import { fromEventPattern } from "rxjs";
import { NgForm } from "@angular/forms";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

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

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    calendar: NgbCalendar
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
    alert(JSON.stringify(this.survey));
    // alert(JSON.stringify(this.event));
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
