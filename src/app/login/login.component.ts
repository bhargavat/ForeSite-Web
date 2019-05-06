import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';
import { User, LoginResponse } from '../models/user';
import { Router} from '@angular/router';
import { AuthService } from '../components/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo_src = 'assets/img/labeled-foresite-300.png';
  submitted = false;
  success = false;
  model: any = {};
  constructor(
    private router: Router,
    public rest: ApiService, 
    private alertService: AlertService,
    private authService: AuthService
    ) {}
  resp: LoginResponse;
  message: any;
  ngOnInit() {
  }

  //When login button is clicked
  onSubmit = function(user:string){
    console.log("Test");
    this.authService.login(user);
    console.log(typeof this.model)
    //let input: string = JSON.stringify(this.model);
    //let response: any = this.rest.login(this.model)
    //console.log("response: " + Object.keys(response))
    this.rest.login(this.model).subscribe(
      data => { 
        this.success = true;
        // console.log("hihi" + this.alertService)
        // console.log('response: ' + data.response)

        if(data.response == 'success'){
          this.router.navigate(['/home'])
        }
        if(data.response == 'fail'){
          this.alertService.error("Login Failed")
        }
        console.log(data.response) // Data which is returned by call
      },

      error => { 
        console.log(error.response);
        this.alertService.error(error);
        console.log(error); // Error if any
      }
    )
    //alert("Response: " + Object.keys(my_user))
    //alert(JSON.stringify(this.model))
  }
}
