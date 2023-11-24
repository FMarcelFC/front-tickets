import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketComponent } from './ticket/ticket.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { UserComponent } from './user/user.component';
import { RegisterTicketComponent } from './register-ticket/register-ticket.component';
import { YourTicketsComponent } from './your-tickets/your-tickets.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'start' },
        { path: 'start', component: StartComponent },
        { path: 'home', component: HomeComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'tickets', component: TicketComponent },
        { path: 'reports', component: ReportComponent },
        { path: 'users', component: UserComponent },
        { path: 'register-ticket', component: RegisterTicketComponent },
        { path: 'your-tickets', component: YourTicketsComponent }




      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DashboardRoutingModule {}