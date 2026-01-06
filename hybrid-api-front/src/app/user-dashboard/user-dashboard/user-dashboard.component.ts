import {Component, inject, input, InputSignal, OnInit, Provider} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../users/authService/auth.service";
import {Subscription} from "rxjs";
import {AppUser, Jobber, NotificationRegister, User} from "../../users/models/users";
import {NotificationService} from "../../websocket/notification.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, CommonModule
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  authService=inject(AuthService);
  isAuthenticated: boolean=false;
  private subscription: Subscription= new Subscription();
  user: AppUser |  undefined | null=null;
  notification:NotificationRegister | undefined;
  notificationService: NotificationService=inject(NotificationService);
  userTypeDashbord : InputSignal<string> = input.required<string>();
  ngOnInit(): void {
    this.authService.emitUserSubject().subscribe({
        next: (user)=>{
          this.user = user;
          console.log("user in login ", user);
        }

      }
    )
    //
    // this.authService.emitisAutSubject().subscribe({
    //   next: (value: boolean) => {this.isAuthenticated = value;}
    // });
    //
    // this.notificationService.notifications.subscribe({
    //   next: (notification)=>{
    //     if(this.user) {  this.user.notification=notification;}
    //   }
    // })

    // this.notificationService.notificationSubject.subscribe({
    //   next: (notification)=>{
    //    if(this.user ) {  this.notification=notification;}
    //
    //   }
    // })


  }
}
