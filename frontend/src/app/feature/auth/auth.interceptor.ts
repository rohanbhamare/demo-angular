import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';


@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private authService:AuthenticationService,private route:Router){}
    
    intercept(req:HttpRequest<any>, next:HttpHandler){
        if(req.headers.get('noAuth'))
            return next.handle(req.clone());
        else{
            const cloneReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer '+ this.authService.getToken())
            })

            return next.handle(cloneReq).pipe(
                tap(
                    event => {},
                    err =>{
                        if(err.error.auth==false)
                        this.route.navigate(["/login"])
                    }
                )
            )
        }
    }
}

