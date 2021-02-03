import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name:string;
  pass:string;
  constructor(private route:Router, private authService:AuthenticationService) {
    if(this.authService.isLoggedIn())this.route.navigate(['/home'])
   }

  ngOnInit(): void {
  }

  signup(){
    this.authService.signup(this.name,this.pass)
    .subscribe((user)=>{
      this.route.navigate(["/login"])
    })
  }

}
