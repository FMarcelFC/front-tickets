import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {
  public user: any;
  public menu: any;
  constructor(private router: Router){
    let token = sessionStorage.getItem('token') ?? 'No token available';
    this.user = jwt_decode(token);
    this.menu = this.user.menu;
    console.log(this.menu)
  }

  openNav(route: string) {
    this.router.navigate(["/dashboard" + route]);
  }
}
