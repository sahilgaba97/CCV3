import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private token:any;
  private userObject:any;

  emailVerified:boolean=true;
  isAuthenticated:boolean=false;
  firstName=null;
  lastName=null;
  bio=null;

  constructor(private authService: AuthService,private router:Router,private route: ActivatedRoute) { }

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
          this.bio=this.userObject.bio
        }
    
      })
  }

  logoutBtn()
  {
    console.log("Logout pressed!")
    this.authService.logout();
    this.router.navigate(['/login'],{relativeTo: this.route})
  }
  editProfile()
  {
    this.router.navigate(['/user','editProfile'],{relativeTo: this.route})
  }
  changePwd()
  {
    this.router.navigate(['/user','changePwd'],{relativeTo: this.route})
  }
}
