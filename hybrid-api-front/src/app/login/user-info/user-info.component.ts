import {Component, inject, input, OnInit, signal} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "../../users/authService/auth.service";
import {
  RegistrationNotificationComponent
} from "../../websocket/registration-notification/registration-notification.component";
import {UserDashboardComponent} from "../../user-dashboard/user-dashboard/user-dashboard.component";
import {AppUser, User} from "../../users/models/users";
import {UserComponent} from "../../users/user/user.component";
import {JobberComponent} from "../../users/jobber/jobber.component";
import {ProviderComponent} from "../../users/provider/provider.component";
import {HomeComponent} from "../../home/home.component";

@Component({
  selector: 'app-user-info',
  imports: [
    NgIf,
    RegistrationNotificationComponent,
    UserDashboardComponent,
    UserComponent,
    JobberComponent,
    ProviderComponent,
    HomeComponent
  ],
  templateUrl: './user-info.component.html',
  standalone: true,
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {
authService:AuthService=inject(AuthService);
  user: AppUser | null = null;
  isAuthenticatedSig = signal<boolean>(false);
  isAuthenticated=input.required<boolean>();
  userTypePage: string | undefined = "";

  validationErrors: { [key: string]: string } = {};

  ngOnInit(): void {
    this.authService.emitisAutSubject().subscribe({
      next: isAuth => {this.isAuthenticatedSig.set(isAuth)}})
      this.authService.emitUserSubject().subscribe({
        next: user => {
          this.user=user;
          this.userTypePage=user?.userType;
          },
      });

  }


  logout() {
this.authService.logout();

  }
}
