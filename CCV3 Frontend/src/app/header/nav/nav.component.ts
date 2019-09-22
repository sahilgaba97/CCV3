import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Base64 } from 'js-base64';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() webName:string;
  
  private token:any;
  private userObject:any;

  isAuthenticated:boolean=false;
  userName:string="userName";
  isAdmin:boolean=false;
  faThumbtack=faThumbtack;

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
          this.userName=Base64.decode(this.userObject.firstName);
          this.isAdmin=this.userObject.admin;
        }
      },
      err=>{
        console.log("err::")
        console.log(err)
      }
      )

    }

    logout()
    {
      this.authService.logout();
    }
}