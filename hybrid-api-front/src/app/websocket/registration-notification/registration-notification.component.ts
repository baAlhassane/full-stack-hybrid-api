import {Component, inject, OnInit} from '@angular/core';
import { NotificationService } from '../notification.service';
import {filter} from "rxjs";
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-registration-notification',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf
  ],
  templateUrl: './registration-notification.component.html',
  styleUrl: './registration-notification.component.css'
})
export class RegistrationNotificationComponent  implements OnInit {
  notificationService: NotificationService = inject(NotificationService);
  lastNotification: any;
  ngOnInit() {

    this.notificationService.notifications
      .pipe(filter(n => n !== null))
      .subscribe((notification: any) => {
        this.lastNotification = notification;
      });
    // this.notificationService.notificationSubject
    //   .pipe(filter(n => n !== null))
    //   .subscribe((notification: any) => {
    //     this.lastNotification = notification;
    //   });

  }
}
