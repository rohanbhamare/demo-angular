import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/feature/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router,private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().subscribe((result)=>{
      console.log(result);
      this.authService.deleteToken();
      this.route.navigate(['/'])
    })
  }

}
