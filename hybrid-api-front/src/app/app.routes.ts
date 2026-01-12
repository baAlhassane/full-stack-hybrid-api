import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./users/user/user.component";
import {JobberComponent} from "./users/jobber/jobber.component";
import {ProviderComponent} from "./users/provider/provider.component";
import {SigInComponent} from "./layout/connexion/sig-in/sig-in.component";
import {SignoutComponent} from "./layout/connexion/signout/signout.component";
import {authGuard} from "./users/authService/authGuard";
import { UserInfoComponent } from './login/user-info/user-info.component';
import {SuccsesRegistrationComponent} from "./login/succses-registration/succses-registration.component";
import {UserProfileComponent} from "./user-dashboard/user-profile/user-profile.component";
import {UserChatComponent} from "./user-dashboard/user-chat/user-chat.component";
import {UserApplicationsComponent} from "./user-dashboard/user-applications/user-applications.component";
import {UserMissionsComponent} from "./user-dashboard/user-missions/user-missions.component";
import {UserCalendarComponent} from "./user-dashboard/user-calendar/user-calendar.component";
import {CreateJobComponent} from "./jobs/create-job/create-job.component";
import {JobBoardComponent} from "./jobs/jobBoards/job-board/job-board.component";
import {JobDetailComponent} from "./jobs/jobBoards/job-detail/job-detail.component";

export const routes: Routes = [
    {
        path:"", component: HomeComponent
    },
  {
    path:"contact", component: HomeComponent
  },
  {
    path:"about", component: HomeComponent
  },
  {
   path:"signin", component: SigInComponent,
    children: [
      { path: 'profile', component: UserProfileComponent }, // ✅ sous-route
      { path: 'chat', component: UserChatComponent },
      { path: 'applications', component: UserApplicationsComponent },
      { path: 'missions', component: UserMissionsComponent },
      { path: 'calendar', component: UserCalendarComponent },
      // { path: 'user', component: UserComponent },
      // { path: 'provider', component: ProviderComponent },
      // { path: 'jobber', component: JobberComponent },
    ]
  },
  {
    path:"signout", component: SignoutComponent
  },

  {
    path:"user", component: UserComponent, canActivate:[authGuard],
    data: {authorities: ["ROLE_LANDLORD"]},
    children: [
      { path: 'profile', component: UserProfileComponent }, // ✅ sous-route
      { path: 'chat', component: UserChatComponent },
      { path: 'applications', component: UserApplicationsComponent },
      { path: 'missions', component: UserMissionsComponent },
      { path: 'calendar', component: UserCalendarComponent },
    ]
  },



  {
    path:"jobber", component: JobberComponent,
    canActivate:[authGuard],
    data: {authorities: ["ROLE_LANDLORD"]},
    children: [
      { path: 'profile', component: UserProfileComponent }, // ✅ sous-route
      { path: 'chat', component: UserChatComponent },
      { path: 'applications', component: UserApplicationsComponent },
      { path: 'missions', component: UserMissionsComponent },
      { path: 'calendar', component: UserCalendarComponent },
    ]
  },

  {
    path:"provider", component: ProviderComponent,
    canActivate:[authGuard],
    data: {authorities: ["ROLE_LANDLORD"]},
    children: [
      { path: 'profile', component: UserProfileComponent }, // ✅ sous-route
      { path: 'chat', component: UserChatComponent },
      //{ path: 'applications', component: UserApplicationsComponent },
      { path: 'create-job', component: CreateJobComponent },
      { path: 'calendar', component: UserCalendarComponent },
    ]
  },
  {
    path:"login", component: LoginComponent
  },
  {
    path:"userinfo", component: UserInfoComponent
  },
  {
    path:"successregestration", component: SuccsesRegistrationComponent
  },

  {
    path:"jobs", component: JobBoardComponent
  },

  {
    path:"jobs/:jobPublicId", component: JobDetailComponent
  },
];


