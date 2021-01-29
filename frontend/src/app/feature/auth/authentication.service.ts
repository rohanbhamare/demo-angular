import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  noAuthHeader = { headers: new HttpHeaders({'noAuth':'true'})}

  login(name:string,pass:string){
    let apiUrl = "http://localhost:3000/users/login";
    let obj = new User();
    obj.username = name;
    obj.password = pass;
    return this.http.post(apiUrl,obj,this.noAuthHeader);
  }

  signup(name:string,pass:string){
    let apiUrl = "http://localhost:3000/users/signup";
    let obj = new User();
    obj.username = name;
    obj.password = pass;
    return this.http.post(apiUrl,obj, this.noAuthHeader);
  }

  setToken(token:string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayload(){
    let token = this.getToken();
    if(token){
      let userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    }
    else return null;
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload) return userPayload.exp > Date.now() / 1000;
    else return false
  }
}
