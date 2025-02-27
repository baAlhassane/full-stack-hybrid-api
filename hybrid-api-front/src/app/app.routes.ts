import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./users/user/user.component";
import {JobberComponent} from "./users/jobber/jobber.component";
import {ProviderComponent} from "./users/provider/provider.component";

export const routes: Routes = [
    {
        path:"", component: HomeComponent
    },

  {
    path:"user", component: UserComponent
  },

  {
    path:"jobber", component: JobberComponent
  },

  {
    path:"provider", component: ProviderComponent
  },
  {
    path:"login", component: LoginComponent
  }

];


