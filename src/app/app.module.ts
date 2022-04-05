import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { CalendarDashboardPage } from './pages/calendar-dashboard/calendar-dashboard.page';
import { VacationRequestPage } from './pages/vacation-request/vacation-request.page';
import { UserProfilePage } from './pages/user-profile/user-profile.page';
import { AdminAreaPage } from './pages/admin-area/admin-area.page';
import { VacationHistoryPage } from './pages/vacation-history/vacation-history.page';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    CalendarDashboardPage,
    VacationRequestPage,
    UserProfilePage,
    AdminAreaPage,
    VacationHistoryPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }