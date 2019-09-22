import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {

  private token:any;
  private userObject:any;

  isAuthenticated:boolean=false;
  email:string;
  msg:string;
  errorMsg:string;
  showSpinner:boolean=false;
  pwdChangeForm:any;
  constructor(private route:ActivatedRoute,private authService:AuthService) { }

  ngOnInit() {
    this.authService.theLoginObs
    .subscribe(
      user=>{
        this.isAuthenticated=!!user.token;
        if(this.isAuthenticated)
        {
          this.token=user.token;
          var payLoad=this.token.split('.')[1];
          var base64=payLoad.replace('-','+').replace('_','/');
          this.userObject=JSON.parse(atob(base64));
          // console.log(this.userObject)
          this.email=this.userObject.email;
          this.pwdChangeForm = new FormGroup({
            email: new FormControl(this.userObject.email,[Validators.required]),
            currentPassword: new FormControl('',[Validators.required]),
            password: new FormControl('',[Validators.required,Validators.minLength(6)]),
            cpassword: new FormControl('',[Validators.required,Validators.minLength(6)])
          })
        }
      })
  }


  submit()
  {
    this.showSpinner=true;
    if(this.pwdChangeForm.value.password===this.pwdChangeForm.value.cpassword)
    {
      this.showSpinner=true;
      this.authService.changePasswordSubmit(this.pwdChangeForm.value)
      .subscribe(
        data=>{
          // console.log(data.msg);
          this.msg=data.msg;
          this.showSpinner=false;
          this.pwdChangeForm.reset();
          this.showSpinner=false;
          this.errorMsg=undefined;
        },
        err=>{
          console.log(err)
          this.showSpinner=false;
          this.errorMsg=err.error.msg;
        }
      )
    }
    else
    {
      console.log("Different password!");
      this.errorMsg="Password does not match"
      this.showSpinner=false;
    }
  }

}
