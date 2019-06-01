import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { UserInfoService } from '../../services/user-info.service';
import { AuthService } from '../../components/auth/auth.service';

import { fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'AppProfile',
  templateUrl: './app-profile.component.html',
  styleUrls: ['./app-profile.component.css']
})


export class AppProfileComponent implements OnInit {

  userInfo = { 
    user_name: ''
   };
  selectedFile: null;
  imageUrl: any;
  selectedUser: Object;

  constructor(
      private router: Router,
      private sanitizer: DomSanitizer,
      private userinfoService: UserInfoService,
      private authService: AuthService
      ){ } 

  ngOnInit() {
    console.log(this.authService.getUsername());
    this.getUserInfo();
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedFile));
  }

  getTitle() {
    return 'Edit Profile';
  }

  getUserInfo(): void{
    this.userInfo['user_name'] = this.authService.getUsername();
    this.userinfoService.getUserInfo(this.userInfo)
    .subscribe(response => {
      // console.log("response", response);
      if(response.response === 'success'){
          this.selectedUser = response.results;
      }
    })
  }

  onSubmit(form: NgForm): void{
    // console.log("this.form=", form);
    var userInfo = {
      user_name: form.value.user_name,
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      email: form.value.email,
      phone_number: form.value.phone_number
    }

    this.userinfoService.updateUser(userInfo)
    .subscribe(response => {
      if(response.response === 'success'){
        //this.selectedUser = response;
        // -------------------ADD ALERT HERE--------------------
      }
    })
  }
}

