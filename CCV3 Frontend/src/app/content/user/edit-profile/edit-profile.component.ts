import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  token:any;
  userObject:{email:string,firstName: string,lastName:string,gender: string,bio: string};  
  isAuthenticated:boolean;

  showLoader:boolean=false;
  responseMsg:string;
  pswdError:boolean=false;
  errorMsg:string;
  successMsg:string;
  editProfileForm:any;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.theLoginObs
      .subscribe(
        (user)=>{
          // console.log("Response: ")
          // console.log(user)
          this.isAuthenticated=!!user.token;
        if(this.isAuthenticated)
        {
          this.token=user.token;
          var payLoad=this.token.split('.')[1];
          var base64=payLoad.replace('-','+').replace('_','/');
          this.userObject=JSON.parse(atob(base64));
          this.editProfileForm = new FormGroup({
            email: new FormControl(this.userObject.email, [Validators.required]),
            firstName: new FormControl(Base64.decode(this.userObject.firstName), [Validators.required,Validators.minLength(4)]),
            lastName: new FormControl(Base64.decode(this.userObject.lastName), [Validators.required,Validators.minLength(2)]),
            gender: new FormControl(this.userObject.gender, Validators.required),
            bio: new FormControl(this.userObject.bio, [Validators.maxLength(250)]),
          })
        }
        },
        (error)=>{
          console.log("Error: ")
          console.log(error)
        })        
  }

  submit()
  {
    this.showLoader=true;
    this.authService.updateProfile(this.editProfileForm.value)
    .subscribe(
      data=>{
        // console.log(data)
        this.successMsg=data.msg;
        this.errorMsg=undefined;
        this.showLoader=false;
      },
      err=>{
        console.log(err)
        this.errorMsg=err.error.msg;
        this.successMsg=undefined;
        this.showLoader=false;
      }
    )
  }

}
