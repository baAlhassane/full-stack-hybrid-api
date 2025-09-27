import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../users/authService/auth.service";
import {Subscription} from "rxjs";
import {NotificationRgisgister, User} from "../../users/models/users";
import {NotificationService} from "../../websocket/notification.service";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  authService=inject(AuthService);
  isAuthenticated: boolean=false;
  private subscription: Subscription= new Subscription();
  user: User | undefined | null=null;
  notification: NotificationRgisgister | undefined;
  notificationService: NotificationService=inject(NotificationService);

  ngOnInit(): void {
    // this.authService.emitUserSubject().subscribe({
    //     next: (user)=>{
    //       this.user = user;
    //       console.log("user in login ", user);
    //     }
    //
    //   }
    // )
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
