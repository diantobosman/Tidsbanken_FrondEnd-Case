import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { CalendarDashboardPage } from './pages/calendar-dashboard/calendar-dashboard.page';
import { VacationRequestPage } from './pages/vacation-request/vacation-request.page';
import { UserProfilePage } from './pages/user-profile/user-profile.page';
import { AdminAreaPage } from './pages/admin-area/admin-area.page';
import { VacationHistoryPage } from './pages/vacation-history/vacation-history.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'

import { CreateVacationPage } from './pages/create-vacation/create-vacation.page';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { NewVacationComponent } from './components/new-vacation/new-vacation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { HistoryComponent } from './components/history/history.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewUserDialogComponent } from './components/new-user-dialog/new-user-dialog.component';
import { ProfileChangeProfileDialogComponent } from './components/profile-change-profile-dialog/profile-change-profile-dialog.component';
import { HistoryListItemComponent } from './components/history-list-item/history-list-item.component';
import { ViewUsersPage } from './pages/view-users/view-users.page';
import { ViewAllUsersComponent } from './components/view-all-users/view-all-users.component';
import { MatListModule } from '@angular/material/list';
import { ViewAllUsersEditDialogComponent } from './components/view-all-users-edit-dialog/view-all-users-edit-dialog.component';
import { VacationRequestItemComponent } from './components/vacation-request-item/vacation-request-item.component';
import { VacationRequestSummaryItemComponent } from './components/vacation-request-summary-item/vacation-request-summary-item.component';
import { VacationRequestSummaryPage } from './pages/vacation-request-summary/vacation-request-summary.page';
import { IneligibleDialogComponent } from './components/ineligible-dialog/ineligible-dialog.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
])

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    CalendarDashboardPage,
    VacationRequestPage,
    UserProfilePage,
    AdminAreaPage,
    VacationHistoryPage,
    LoginFormComponent,
    NavbarComponent,
    CreateVacationPage,
    CalendarComponent,
    NewVacationComponent,
    ProfileComponent,
    AdminComponent,
    HistoryComponent,
    NewUserComponent,
    NewUserDialogComponent,
    ProfileChangeProfileDialogComponent,
    HistoryListItemComponent,
    IneligibleDialogComponent,
    ViewUsersPage,
    ViewAllUsersComponent,
    ViewAllUsersEditDialogComponent,
    VacationRequestItemComponent,
    VacationRequestSummaryItemComponent,
    VacationRequestSummaryPage
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatChipsModule,
    FullCalendarModule,
    MatListModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }