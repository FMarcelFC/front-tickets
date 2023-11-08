import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  public user: any;
  constructor(
    private observer: BreakpointObserver,
    private router: Router,
  ) {
    let token = sessionStorage.getItem('token') ?? 'No token available';
    this.user = jwt_decode(token);
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 1200px)']).subscribe((res: any) => {
      setTimeout(() => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      }, 150);
    });
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
