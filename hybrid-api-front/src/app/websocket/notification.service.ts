import {Injectable, signal} from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {BehaviorSubject, Subject} from 'rxjs';
import {NotificationRegister} from "../users/models/users";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private client: Client;
  listNotificationsSignal = signal<NotificationRegister[]>([]);
  private notifications$ = new BehaviorSubject<NotificationRegister>({name:"",email:""});
  private notificationSubject$ = new Subject<NotificationRegister>();

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
      reconnectDelay: 5000
    });

    this.client.onConnect = () => {
      this.client.subscribe('/topic/notifications', (message: IMessage) => {
        this.notifications$.next(JSON.parse(message.body));
        this.notificationSubject$.next(JSON.parse(message.body));
        this.listNotificationsSignal.update(list => [...list, JSON.parse(message.body)]);
        console.log("JSON.parse(message.body)  :", JSON.parse(message.body));
        console.log("message.body  :", (message.body));
        console.log("message  :", message);
        console.log("listNotificationsSignal() :", this.listNotificationsSignal());
      });
    };

    this.client.activate();
  }

  get notifications() {
    return this.notifications$.asObservable();
  }
  get notificationSubject() {
    return this.notificationSubject$.asObservable();
  }









}
