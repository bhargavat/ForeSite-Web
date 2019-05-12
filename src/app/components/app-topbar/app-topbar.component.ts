import { Component, OnInit } from '@angular/core';
// import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';
import { SidenavService } from '../../app-main/sidenav.service';
import { RightSidenavService } from '../../app-main/rightsidenav.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.css']
})
export class AppTopbarComponent implements OnInit {

  constructor(private authService: AuthService, private sidenav: SidenavService, private rightsidenav: RightSidenavService) {

  }
 userName = this.authService.getUsername();
 toggleSidenav() {
   this.sidenav.toggle();
 }

 toggleRightSidenav() {
  this.rightsidenav.toggle();
}

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

}
