import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminAreaPage } from "./pages/admin-area/admin-area.page";
import { CalendarDashboardPage } from "./pages/calendar-dashboard/calendar-dashboard.page";
import { LoginPage } from "./pages/login/login.page";
import { UserProfilePage } from "./pages/user-profile/user-profile.page";
import { VacationHistoryPage } from "./pages/vacation-history/vacation-history.page";
import { VacationRequestPage } from "./pages/vacation-request/vacation-request.page";

const routes: Routes = [
    {
        path: "",
        component: LoginPage
    },
    {
        path: "calendar",
        component: CalendarDashboardPage 
    },
    {
        path: "vacation-request",
        component: VacationRequestPage
    },
    {
        path: "vacation-history",
        component: VacationHistoryPage
    },
    {
        path: "user-profile",
        component: UserProfilePage
    },
    {
        path: "admin-area",
        component: AdminAreaPage
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