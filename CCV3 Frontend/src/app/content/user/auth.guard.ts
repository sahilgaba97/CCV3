import { Injectable } from "@angular/core";
import { AuthService } from 'src/app/auth.service';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate
{
    constructor(private authService: AuthService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>
    {
        return this.authService.theLoginObs.pipe(
            take(1),
            map(user=>{
                const isAuth=!!user.token;
                if(isAuth)
                {
                    return true;
                }
                return this.router.createUrlTree(['/login']);
            })
        )
    }
}