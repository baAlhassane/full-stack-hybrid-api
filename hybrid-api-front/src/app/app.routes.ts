import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./users/user/user.component";
import {JobberComponent} from "./users/jobber/jobber.component";
import {ProviderComponent} from "./users/provider/provider.component";
import {SigInComponent} from "./layout/connexion/sig-in/sig-in.component";
import {SignoutComponent} from "./layout/connexion/signout/signout.component";

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
   path:"signin", component: SigInComponent
  },
  {
    path:"signout", component: SignoutComponent
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


