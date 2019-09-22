import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  successMsgDisplay:boolean=false;
  errMsgDisplay:boolean=false;
  showLoader:boolean=false;
  responseMsg:string;
  pswdError:boolean=false;
  emailRegistered:boolean= false;

  signupForm = new FormGroup({
    imgUrl: new FormControl('assets/images/profile-picture.png'),
    firstName: new FormControl('', [Validators.required,Validators.minLength(1)]),
    lastName: new FormControl('', [Validators.required,Validators.minLength(1)]),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  })

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  signupSubmit()
  {
    this.showLoader=true;
    // console.log(this.signupForm.value);
    //Confirm Password
    if(this.signupForm.value.password==this.signupForm.value.confirmPassword)
    {
      //Signup at backend
      // console.log("Correct Password");
      this.authService.signUp(this.signupForm.value)
      .subscribe(
        (response)=>{
          // console.log("Response: ")
          // console.log(response)
          this.showLoader=false;
          this.successMsgDisplay=true;
          this.errMsgDisplay=false;
          this.responseMsg=response.msg
          this.pswdError=false;
          this.signupForm.reset()
        },
        (error)=>{
          console.log("Error: ")
          console.log(error)
          this.showLoader=false;
          this.pswdError=false;
          this.successMsgDisplay=false;
          this.errMsgDisplay=true;
          this.responseMsg=error.error.msg
        }
      )
    }
    else
    {
      // console.log("I am in else block.")
      this.pswdError=true;
      this.showLoader=false;
      // console.log("I am in else block.2")
    }
  }
}
