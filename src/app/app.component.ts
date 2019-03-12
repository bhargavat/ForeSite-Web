import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ForeSite-Web';
  logo_src = 'assets/img/labeled-foresite-300.png';

  constructor(
    private router: Router
  ){

  }
}
