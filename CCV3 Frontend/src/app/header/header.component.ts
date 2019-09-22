import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  websiteName:string ="coconutc.com";

  private token:any;
  private userObject:any;
  isAuthenticated:boolean=false;
  

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
        }
      }
    )
  }

}
