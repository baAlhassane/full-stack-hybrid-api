import {Component, inject, OnInit} from '@angular/core';
import {NotificationService} from "../notification.service";
import {filter} from "rxjs";
import {JsonPipe} from "@angular/common";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-notification',
    imports: [
        CommonModule, //JsonPipe,
    ],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {


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
 // ngOnInit() {}
}
