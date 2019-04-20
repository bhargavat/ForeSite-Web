import { Component , OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})
export class AppMainComponent implements OnInit {
  title = 'ForeSite-Web';
  logo_src = 'assets/img/labeled-foresite-300.png';

  opened: boolean;
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    // private router: Router,
    private sidenavService: SidenavService
  ){

  }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
