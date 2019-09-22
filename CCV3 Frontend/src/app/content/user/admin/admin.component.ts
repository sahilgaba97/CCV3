import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private token:any;
  private userObject:any;

  isAuthenticated:boolean=false;
  userName:string="userName";
  isAdmin:boolean=false;

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
          
          this.userName=this.userObject.firstName;
          this.isAdmin=this.userObject.admin;
        }
      })

  }

}
