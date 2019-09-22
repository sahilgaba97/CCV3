import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  successMsgA:boolean=false;
  successMsg:String;
  errorMsgA:boolean=false;
  errorMsg:string;
  msg:string;
  authorized:boolean=false;
  pwdToken:string;
  showSpinner:boolean=true;

  constructor(private route:ActivatedRoute,private authService:AuthService) { }

  ngOnInit() {
    this.pwdToken=this.route.snapshot.params['resetToken']

    this.authService.checkRstPswdToken(this.pwdToken)
    .subscribe(
      data=>{
        this.authorized=data.authorized;
        this.msg=data.msg;
        this.showSpinner=false;
      },
      err=>{
        console.log(err)
        this.authorized=err.error.authorized;
        this.msg=err.error.msg;
        this.showSpinner=false;
      }
    )
  }


  pwdResetForm = new FormGroup({
    pwdToken: new FormControl(this.route.snapshot.params['resetToken']),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    cpassword: new FormControl('',[Validators.required,Validators.minLength(6)])
  })

  submit()
  {
    if(this.pwdResetForm.value.password===this.pwdResetForm.value.cpassword)
    {
      this.showSpinner=true;
      this.errorMsgA=false;
      this.errorMsg=null;
      this.authService.resetPasswordSubmit(this.pwdResetForm.value)
      .subscribe(
        data=>{
          this.successMsg=data.msg;
          this.successMsgA=true;
          this.errorMsgA=false;
          // console.log(data.msg);
          this.showSpinner=false;
          this.pwdResetForm.reset();
        },
        err=>{
          console.log(err)
          this.successMsgA=false;
          this.errorMsgA=true;
          this.errorMsg="could not connect";
          this.showSpinner=false;
        }
      )
    }
    else
    {
      console.log("Different password!");
      this.successMsgA=false;
      this.errorMsgA=true;
      this.errorMsg="Password does not match.";
      this.showSpinner=false;
    }
  }

}
