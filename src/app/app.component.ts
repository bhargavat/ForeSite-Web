import { Component , OnInit, ViewChild} from '@angular/core';
// import { MatSidenav } from '@angular/material';
// import { SidenavService } from './app-main/sidenav.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // title = 'ForeSite-Web';
  // logo_src = 'assets/img/labeled-foresite-300.png';

  // opened: boolean;
  // @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    // private router: Router,
    // private sidenavService: SidenavService
  ){

  }

  ngOnInit(): void {
    // this.sidenavService.setSidenav(this.sidenav);
  }
}
