import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TicketDialogComponent } from './ticket/ticket-dialog/ticket-dialog.component';
import { ReportComponent } from './report/report.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UserDialogComponent } from './user/user-dialog/user-dialog.component';
import { RegisterTicketComponent } from './register-ticket/register-ticket.component';
import { YourTicketsComponent } from './your-tickets/your-tickets.component';
import { StartComponent } from './start/start.component';



@NgModule({
  declarations: [
    TicketComponent,
    ProfileComponent,
    TicketDialogComponent,
    ReportComponent,
    HomeComponent,
    UserComponent,
    UserDialogComponent,
    RegisterTicketComponent,
    YourTicketsComponent,
    StartComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DashboardModule { }
