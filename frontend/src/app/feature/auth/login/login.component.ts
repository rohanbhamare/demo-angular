import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name:string;
  pass:string;

  constructor(private route:Router, private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.name,this.pass)
    .subscribe((user)=>{
      this.route.navigate(["/home"])
    })
    
  }

  goToSignup(){
    this.route.navigate(["/signup"])
  }

}
