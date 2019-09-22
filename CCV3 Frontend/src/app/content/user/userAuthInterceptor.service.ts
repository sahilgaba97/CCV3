import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthService } from 'src/app/auth.service';
import { take,exhaustMap } from 'rxjs/operators' 
import { User } from 'src/models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class userAuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService){}
    


    intercept(req: HttpRequest<any>,next: HttpHandler) {
        // console.log("Checking token: ")
        // console.log(this.authService.token)
        if(this.authService.token)
        {
            // console.log("Header set to: ")
            // console.log(`Bearer ${this.authService.token}`)
            const cloned=req.clone({
                headers: req.headers.set('Authorization',`Bearer ${this.authService.token}`)
            })
            return next.handle(cloned)
        }
        return next.handle(req)
        
    }
}