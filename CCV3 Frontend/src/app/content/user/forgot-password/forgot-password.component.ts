import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/auth.service';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  disableSubmit:boolean=false;
  successMsg:boolean=false;
  errorMsg:boolean=false;
  msg:string;
  success_msg:string;
  showSpinner:boolean=false;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email])
  })
  

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  Submit()
  {
    this.showSpinner=true;
    this.authService.forgotPassword(this.forgotPasswordForm.value)
    .subscribe(
      (response)=>{
        this.success_msg=response.msg;
        this.errorMsg=false;
        this.successMsg=true;
        this.disableSubmit=true;
        this.forgotPasswordForm.reset();
        this.showSpinner=false;
      },
      (err)=>{
        console.log("error")
        console.log(err)
        this.successMsg=false;
        this.errorMsg=true;
        this.msg=err.error.msg
        this.showSpinner=false;
      }
    )
  }


}
