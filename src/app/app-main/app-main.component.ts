import { Component , OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from './sidenav.service';
import { RightSidenavService } from './rightsidenav.service';
import { AuthService } from '../components/auth/auth.service';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { DomSanitizer } from '@angular/platform-browser';
import { EventService } from '../services/event.service';
import { Event } from '../event'


@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})

export class AppMainComponent implements OnInit {
  userInfo = { 
    user_name: ''
   };

  eventList: Event[] = [];
  title = 'ForeSite-Web';
  logo_src = 'assets/img/labeled-foresite-300.png';


  //opened: boolean;

  @ViewChild('sidenav') public sidenav: MatSidenav;
  @ViewChild('rightsidenav') public rightsidenav: MatSidenav;

  constructor(
    // private router: Router,
    private sidenavService: SidenavService,
    private rightsidenavService: RightSidenavService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private eventService: EventService
  ){

  }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.rightsidenavService.setSidenav(this.rightsidenav);
    this.getEvent();
    console.log("haha",this.eventList);
  }

  onLogout() {
    this.authService.logout();
  }

  getEvent(): void{
    this.userInfo['user_name'] = this.authService.getUsername();
    console.log("userInfo =", this.userInfo);
    this.eventService.getEvent(this.userInfo)
    .subscribe(response => {
      if(response.response === 'success'){
          this.eventList = response.results;
      }
    })
  }
}
