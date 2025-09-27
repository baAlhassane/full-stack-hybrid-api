import {Component, inject} from '@angular/core';
import {LoginComponent} from "../../login/login.component";
import {NgIf} from "@angular/common";
import {AuthService} from "../authService/auth.service";
import {Subscription} from "rxjs";
import {NotificationRgisgister, User} from "../models/users";
//import {NotificationComponent} from "../../notification/notification/notification.component";

import {
  RegistrationNotificationComponent
} from "../../websocket/registration-notification/registration-notification.component";
import {UserDashboardComponent} from "../../user-dashboard/user-dashboard/user-dashboard.component";
import {NotificationService} from "../../websocket/notification.service";
import {ChatService} from "../../websocket/chat.service";

@Component({
  selector: 'app-user',
  imports: [
    NgIf,
    RegistrationNotificationComponent, UserDashboardComponent
  ],
  templateUrl: './user.component.html',
  standalone: true,
  styleUrl: './user.component.css'
})
export class UserComponent {

  authService=inject(AuthService);
  isAuthenticated: boolean=false;
  private subscription: Subscription= new Subscription();
  user: User | undefined | null=null;
  notification: NotificationRgisgister | undefined;
  notificationService: NotificationService=inject(NotificationService);
  chatService: ChatService=inject(ChatService);

  ngOnInit(): void {

    this.authService.emitUserSubject().subscribe({
        next: (user)=>{
          this.user = user;
          console.log("user in login ", user);
        }

      }
    )

    this.authService.emitisAutSubject().subscribe({
      next: (value: boolean) => {this.isAuthenticated = value;}
    });

this.notificationService.notifications.subscribe({
  next: (notification)=>{
   if(this.user) {  this.user.notification=notification;}
  }
})

    // this.notificationService.notificationSubject.subscribe({
    //   next: (notification)=>{
    //    if(this.user ) {  this.notification=notification;}
    //
    //   }
    // })


  }

}
