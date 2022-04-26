import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { AdminAreaPage } from "./pages/admin-area/admin-area.page";
import { CalendarDashboardPage } from "./pages/calendar-dashboard/calendar-dashboard.page";
import { LoginPage } from "./pages/login/login.page";
import { UserProfilePage } from "./pages/user-profile/user-profile.page";
import { VacationHistoryPage } from "./pages/vacation-history/vacation-history.page";
import { VacationRequestPage } from "./pages/vacation-request/vacation-request.page";
import { CreateVacationPage } from "./pages/create-vacation/create-vacation.page";
import { LoginGuard } from "./guards/login.guard";
import { RouterLinkActive } from "@angular/router";
import { ViewUsersPage } from "./pages/view-users/view-users.page";
import { VacationRequestSummaryPage } from "./pages/vacation-request-summary/vacation-request-summary.page";
import { VacationNewRequestSummaryPage } from "./pages/vacation-new-request-summary/vacation-new-request-summary.page";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/login"
    },
    {
        path: "login",
        component: LoginPage,
        canActivate: [ LoginGuard ]
    },
    {
        path: "calendar",
        component: CalendarDashboardPage,
        canActivate: [ AuthGuard ]
    },
    {
        path: "vacation-request",
        component: VacationRequestPage,
        canActivate: [ AuthGuard ]
    },
    {
        path: "vacation-history",
        component: VacationHistoryPage,
        canActivate: [ AuthGuard]
    },
    {
        path: "create-vacation",
        component: CreateVacationPage,
        canActivate: [ AuthGuard ]

    },
    {
        path: "vacation-new-request-summary",
        component: VacationNewRequestSummaryPage,
        canActivate: [ AuthGuard ]

    },
    {
        path: "vacation-request-summary",
        component: VacationRequestSummaryPage,
        canActivate: [ AuthGuard ]

    },
    {
        path: "user-profile",
        component: UserProfilePage,
        canActivate: [ AuthGuard ]
    },
    {
        path: "admin-area",
        component: AdminAreaPage,
        canActivate: [ AuthGuard ]
    },
    {
        path: "view-users",
        component: ViewUsersPage,
        canActivate: [ AuthGuard ]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}