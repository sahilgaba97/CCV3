import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Base64 } from 'js-base64';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {


  feedbackForm=new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.minLength(4)]),
    lastName: new FormControl('', [Validators.required,Validators.minLength(2)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    feedbackText: new FormControl('', [Validators.required,Validators.maxLength(500),Validators.minLength(10)]),
  })

  isAuthenticated:boolean;
  private userObject:any;
  private token: any;
  showLoader:boolean=false;
  responseMsg:string;
  firstName: string="Sexy";
  lastName: string;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.theLoginObs
    .subscribe(
      loadedUser=>{
        this.isAuthenticated=!!loadedUser.token;
        if(this.isAuthenticated)
        {
          this.token=loadedUser.token;
          var payLoad=this.token.split('.')[1];
          var base64=payLoad.replace('-','+').replace('_','/');
          this.userObject=JSON.parse(atob(base64));
          // console.log(this.userObject);
          this.firstName=Base64.decode(this.userObject.firstName);
          this.lastName=Base64.decode(this.userObject.lastName);
        }
          this.feedbackForm.patchValue({
            firstName: Base64.decode(this.userObject.firstName),
            lastName: Base64.decode(this.userObject.lastName),
            email: this.userObject.email,
          }) 
      })

  }

  feedbackSubmit()
  {

  }
}
