import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/auth.service';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg:boolean=false;
  msg:string;
  showSpinner:boolean=false;

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
  })
  

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  loginSubmit()
  {
    this.showSpinner=true;
    this.authService.postLogin(this.loginForm.value)
    .subscribe(
      (response)=>{
        this.showSpinner=false;
        this.loginForm.reset();
        this.router.navigate(['/']);
      },
      (err)=>{
        this.showSpinner=false;
        this.errorMsg=true;
        this.msg=err.error.msg
      }
    )
  }

}
