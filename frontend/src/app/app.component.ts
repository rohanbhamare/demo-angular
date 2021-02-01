import { Component } from '@angular/core';
import { Router }  from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  constructor(public router: Router){} // note you have to use Public because you are using it in html file too.
}
