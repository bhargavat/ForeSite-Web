import { Component , OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from './sidenav.service';
import { RightSidenavService } from './rightsidenav.service';
import { AuthService } from '../components/auth/auth.service';
import { SatPopoverModule } from '@ncstate/sat-popover';


@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})
export class AppMainComponent implements OnInit {
  title = 'ForeSite-Web';
  logo_src = 'assets/img/labeled-foresite-300.png';

  //opened: boolean;

  @ViewChild('sidenav') public sidenav: MatSidenav;
  @ViewChild('rightsidenav') public rightsidenav: MatSidenav;

  constructor(
    // private router: Router,
    private sidenavService: SidenavService,
    private rightsidenavService: RightSidenavService,
    private authService: AuthService
  ){

  }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.rightsidenavService.setSidenav(this.rightsidenav);
  }

  onLogout() {
    this.authService.logout();
  }
}
