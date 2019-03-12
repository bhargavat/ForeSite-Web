import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  logo_src = 'assets/img/labeled-foresite-300.png';
  model: any = {};
  confirm_password: any;
  // registerForm: FormGroup;
  // submitted = false;
  constructor(
    public rest: ApiService,
    private alertService: AlertService
      // private formBuilder: FormBuilder,
      // private router: Router,

  ) { }

  ngOnInit() {
    // this.registerForm = this.formBuilder.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   username: ['', Validators.required],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // })
  }
  onSubmit = function(user:string){
    let input: string = JSON.stringify(this.model);
    console.log(input)
    console.log(this.confirm_password)
    if(this.model.password == this.confirm_password){
      this.rest.create_user(this.model).subscribe(
      data => { 

        if(data.response == 'success'){
          this.alertService.success('Registration successful', true);
        }
        if(data.response == 'fail'){
          this.alertService.error("Registration failed")
        }
        console.log(JSON.stringify(data)) // Data which is returned by call
      },

      error => { 
        console.log(error.response);
        this.alertService.error(error);
        console.log(error); // Error if any
      }
   );
    }else{
      this.alertService.error("Passwords don't match");
    }

  }
}
