import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact';
// import { PhonebookService } from 'src/app/service/phonebook.service';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'AppProfile',
  templateUrl: './app-profile.component.html',
  styleUrls: ['./app-profile.component.css']
})
export class AppProfileComponent implements OnInit {

  contact: Contact;
  selectedFile: null;
  imageUrl: any;

  constructor(
      private router: Router,
      private http: HttpClient,
      private sanitizer: DomSanitizer) { } 

  ngOnInit() {
    this.contact = new Contact();
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedFile));
  }

  // onUpload(){
  //   const fd = new FormData();
  //   fd.append('image', this.selectedFile, this.selectedFile.name);
  //   this.http.post(' ', fd).subscribe(res =>
  //     console.log(res));
  // }

  getTitle() {
    return 'Edit Profile';
  }
}

