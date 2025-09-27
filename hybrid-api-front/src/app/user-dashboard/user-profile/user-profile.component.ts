
import {Component, inject, OnInit} from '@angular/core';
import {NotificationRgisgister, User} from "../../users/models/users";
import {AuthService} from "../../users/authService/auth.service";
import {Subscription} from "rxjs";
import {NotificationService} from "../../websocket/notification.service";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  authService=inject(AuthService);
  isAuthenticated: boolean=false;
  private subscription: Subscription= new Subscription();
  user: User | undefined | null=null;
  notification: NotificationRgisgister | undefined;
  notificationService: NotificationService=inject(NotificationService);

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
