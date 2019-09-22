import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Base64 } from 'js-base64';
import { Subject } from 'rxjs';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notes-template',
  templateUrl: './notes-template.component.html',
  styleUrls: ['./notes-template.component.css']
})
export class NotesTemplateComponent implements OnInit {
  
  private token:any;
  private userObject:any;

  isAuthenticated:boolean=false;
  userName:string="userName";
  isAdmin:boolean=false;


  @Input() 
  object:{
    heading:string, 
    text:string, 
    subject:string,
    dateCreated: string, 
    userFirstName: string,
    userEmail: string,
    author: string,
    authorized: boolean,
    filename: string,
    fileLocation: string,
    originalname: string,
  };

  faThumbtack=faThumbtack;

  constructor(private router:Router, private route:ActivatedRoute,private authService: AuthService) { }


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

  onClickView()
  {
      this.router.navigate(['/pdf/'+this.object.filename+'/'+this.object.originalname+'/'+this.object.heading]);
  }

}
