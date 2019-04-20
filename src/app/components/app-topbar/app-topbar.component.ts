import { Component, OnInit } from '@angular/core';
// import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';
import { SidenavService } from '../../app-main/sidenav.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.css']
})
export class AppTopbarComponent implements OnInit {

  constructor(private sidenav: SidenavService) {

  }

 toggleSidenav() {
   //this.toggleActive = !this.toggleActive;
   this.sidenav.toggle();
 }

  ngOnInit() {
  }

}
