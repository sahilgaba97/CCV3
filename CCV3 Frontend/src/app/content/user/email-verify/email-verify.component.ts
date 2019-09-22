import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {
  
  t=5;
  msg:string;
  id:any;
  constructor(private router:Router,private route: ActivatedRoute,private authServive: AuthService) { }

  // patch /auth/userAuthentication/:ObjectID
  
  ngOnInit() {
    this.id=this.route.snapshot.params['id']
    this.authServive.verifyEmail(this.id)
    .subscribe(
      (response)=>{
        this.msg=response.msg;
        setInterval(()=>{this.t--},1000)
        setTimeout(()=>{this.router.navigate(['/login'])},this.t*1000)
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
