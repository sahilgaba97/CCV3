import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private token:any;
  private userObject:any;

  emailVerified:boolean=true;
  isAuthenticated:boolean=false;
  firstName=null;
  lastName=null;

  constructor(private authService: AuthService) { }

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
          this.emailVerified=this.userObject.emailVerified;
          this.firstName=Base64.decode(this.userObject.firstName)
          this.lastName=Base64.decode(this.userObject.lastName)
        }
    
      })

    }
}
