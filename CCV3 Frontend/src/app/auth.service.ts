import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Subject,BehaviorSubject } from 'rxjs'; 
import {tap} from 'rxjs/operators';
import { User } from 'src/models/user.model';
import { take } from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable()
export class AuthService
{
    private _token:any;
    private _expiresIn:any;
    private _expDate:any;
    private tokenExpTimer:any;
    // private backendServerLink="http://ec2-13-233-190-143.ap-south-1.compute.amazonaws.com:3000";
    private backendServerLink=environment.backendLink;
    defaultUser=new User(null,null);

    private loginSubject=new BehaviorSubject<User>(this.defaultUser);
    
    constructor(private http: HttpClient){}

    get theLoginObs()
    {
        return this.loginSubject.asObservable();
    }

    get token()
    {
        return this._token;
    }

    signUp(user: Object)
    {
        return this.http.post<{msg:string,user:any}>(`${this.backendServerLink}/auth/signup`,user)
    }
    verifyEmail(id:any)
    {
        return this.http.patch<{msg: string}>(`${this.backendServerLink}/auth/userAuthentication/${id}`,{id:id});
    }
    postLogin(obj: Object){
        return this.http.post<{msg:string,token: string, expiresIn: number}>(`${this.backendServerLink}/auth/login`,obj)
        .pipe(take(1),tap(data=>{
            if(data)
            {                
                let resData=data;
                const expDate=new Date(new Date().getTime()+ resData.expiresIn );
                const token=resData.token;
                this._token=resData.token;
                this._expiresIn=resData.expiresIn;
                this._expDate=expDate;
                const user=new User( token, expDate);
                this.autoLogout(this._expiresIn);
                this.loginSubject.next(user);
                
                localStorage.setItem('userData',JSON.stringify(user));
            }
        }))

    }

    logout()
    {
        this.loginSubject.next(this.defaultUser);
        this._token=undefined;
        localStorage.removeItem('userData');
        if(this.tokenExpTimer)
        {
            clearTimeout(this.tokenExpTimer)
        }
        this.tokenExpTimer=null;
    }

    autoLogin()
    {
        const userData:{
            _token:string,
            expDate:string
        }=JSON.parse(localStorage.getItem('userData'))

        if(!userData)
        {
            return;
        }
        const loadUser=new User(userData._token,new Date(userData.expDate))
        if(loadUser.token)
        {
            this._token=loadUser.token;
            this._expiresIn=new Date(userData.expDate).getTime()
            this._expDate=new Date(userData.expDate)
            this.loginSubject.next(loadUser);
            this.autoLogout(
                this._expDate.getTime()-new Date().getTime()
            );
        }
    }

    autoLogout(expDuration:number)
    {
        this.tokenExpTimer=setTimeout(()=>{this.logout()},expDuration)
    }
    forgotPassword(obj: Object)
    {
        return this.http.post<{msg: string}>(`${this.backendServerLink}/auth/forgotPassword`,obj)
    }
    checkRstPswdToken(pwdToken:string)
    {
        return this.http.post<{authorized: boolean,msg: string}>(`${this.backendServerLink}/auth/resetPassword`,{pwdToken: pwdToken})
    }
    resetPasswordSubmit(object:Object)
    {
        return this.http.post<{msg:string}>(`${this.backendServerLink}/auth/resetPasswordSubmit`,object)
    }
    changePasswordSubmit(object:Object)
    {
        return this.http.post<{msg:string}>(`${this.backendServerLink}/auth/changePasswordSubmit`,object)
    }
    updateProfile(object:Object)
    {
        return this.http.post<{msg:string}>(`${this.backendServerLink}/auth/updateProfileSubmit`,object)
    }
    docUploadFormSubmit(object:Object)
    {
        // console.log("Reached authService: docUpload():")
        return this.http.post<{msg:string,success:boolean}>(`${this.backendServerLink}/auth/docUploadFormSubmit`,object)
    }
    getUnauthDocs(page:number)
    {
        return this.http.get<{docsArray: any,totalPages: any,totalDocs: any}>(`${this.backendServerLink}/auth/admin/unauthDocs/${page}`)
    }
    authorizeDoc(data)
    {
        return this.http.post<{success: boolean, status: string}>(`${this.backendServerLink}/auth/admin/authorizeDoc`,data)
    }
    rejectDoc(data)
    {
        return this.http.post<{success: boolean, status: string}>(`${this.backendServerLink}/auth/admin/rejectDoc`,data)
    }
}