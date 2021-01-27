import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  login(name:string,pass:string){
    let apiUrl = "http://localhost:3000/users/login";
    let obj = new User();
    obj.username = name;
    obj.password = pass;
    return this.http.post(apiUrl,obj);
  }

  signup(name:string,pass:string){
    let apiUrl = "http://localhost:3000/users/signup";
    let obj = new User();
    obj.username = name;
    obj.password = pass;
    return this.http.post(apiUrl,obj);
  }
}
