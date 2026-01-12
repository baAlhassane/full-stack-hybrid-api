
import { Injectable } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import {ChatMessage} from "./chat.Model";
import {AppUser, BaseUser, NotificationRegister, User} from "../users/models/users";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private client: Client;
  private messages$ = new BehaviorSubject<ChatMessage[]>([]);
  private senders$ = new BehaviorSubject<AppUser[]>([]);
  private activeSubscriptions: { [roomId: string]: StompSubscription } = {};

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
      reconnectDelay: 5000
    });
    this.client.onConnect = () => {
      console.log('✅constructor.this.client.onConnect  Connected to chat server');
    };
    this.client.activate();
  }

  joinRoom(roomId: string, user: AppUser) {
    // ⚠️ toujours string ici
    // if (this.activeSubscriptions[roomId]) {
    //   console.warn(`Already subscribed to room ${roomId}`);
    //   return;
    // }

    const subscription = this.client.subscribe(`/topic/messages/${roomId}`, (message: IMessage) => {
      const msg: ChatMessage = JSON.parse(message.body);
      this.messages$.next([...this.messages$.value, msg]);

    });
    // utilisateurs connectés
    const subscriptionUsers = this.client.subscribe(
      `/topic/users/${roomId}`,
      (message: IMessage) => {
        const users: AppUser[] = JSON.parse(message.body);
        this.senders$.next(users);
        console.log(this.senders$.value);
      }
    );
    const currentUser = {
      firstname: user.firstname,
      lastname:  user.lastname,
      email:  user.email,
      imageUrl:  user.imageUrl,
      userType:  user.userType
    };
    // prévenir le serveur qu’on rejoint
    this.client.publish({
      destination: `/app/join/${roomId}`,
      body: JSON.stringify( currentUser )
    });

    this.activeSubscriptions[roomId] = subscription;
  }





  sendMessage(roomId: string, msg: ChatMessage) {
    this.client.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(msg)
    });
  }

  getMessages() {
    return this.messages$.asObservable();
  }
  getSenders() {
    return this.senders$.asObservable();
  }


// Dans ChatService.ts
  leaveRoom(roomId: string, user: AppUser) {
    if (this.activeSubscriptions[roomId]) {
      // 1. On se désabonne d'abord
      this.activeSubscriptions[roomId].unsubscribe();
      delete this.activeSubscriptions[roomId];

      // 2. On prévient le serveur SEULEMENT si on vient de supprimer la souscription
      this.client.publish({
        destination: `/app/leave/${roomId}`,
        body: JSON.stringify(user)
      });
      console.log(`🚪 Signal de départ envoyé pour la salle : ${roomId}`);
    }
  }

  // Dans ChatService.ts
  leaveAllRooms(user: AppUser) {
    Object.keys(this.activeSubscriptions).forEach(roomId => {
      this.leaveRoom(roomId, user); // Appelle la version sécurisée
    });
  }


  // leaveRoom(roomId: string, user: AppUser) {
  //   if (this.activeSubscriptions[roomId]) {
  //     this.activeSubscriptions[roomId].unsubscribe();
  //     console.log("leave room");
  //     delete this.activeSubscriptions[roomId];
  //   }
  //   //  prévenir le serveur
  //   this.client.publish({
  //     destination: `/app/leave/${roomId}`,
  //     body: JSON.stringify(user)
  //   });
  // }

  // leaveAllRooms(user: AppUser) {
  //   Object.keys(this.activeSubscriptions).forEach(roomId => {
  //     this.activeSubscriptions[roomId].unsubscribe();
  //     delete this.activeSubscriptions[roomId];
  //
  //     this.client.publish({
  //       destination: `/app/leave/${roomId}`,
  //       body: JSON.stringify(user)
  //     });
  //   });
  // }

}





/* code qui marche avec les methode asynchrone et await*/

//
// import { Injectable } from '@angular/core';
// import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { BehaviorSubject, firstValueFrom } from 'rxjs';
// import { ChatMessage } from './chat.Model';
//
// @Injectable({ providedIn: 'root' })
// export class ChatService {
//   private client: Client;
//   private messages$ = new BehaviorSubject<ChatMessage[]>([]);
//   private activeSubscriptions: { [roomId: string]: StompSubscription } = {};
//   private connected$ = new BehaviorSubject<boolean>(false);
//
//   constructor() {
//     this.client = new Client({
//       webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
//       reconnectDelay: 5000
//     });
//
//     this.client.onConnect = () => {
//       console.log('✅ Connected to chat server');
//       this.connected$.next(true);
//     };
//
//     this.client.onStompError = (frame) => {
//       console.error('❌ STOMP error:', frame.headers['message'], frame.body);
//     };
//
//     this.client.activate();
//   }
//
//   /** Attendre que STOMP soit connecté */
//   private async waitForConnection(): Promise<void> {
//     if (this.connected$.value) return;
//     await firstValueFrom(this.connected$.asObservable());
//   }
//
//   async joinRoom(roomId: string) {
//     await this.waitForConnection();
//
//     if (this.activeSubscriptions[roomId]) {
//       console.warn(`⚠️ Already subscribed to room ${roomId}`);
//       return;
//     }
//
//     const subscription = this.client.subscribe(
//       `/topic/messages/${roomId}`,
//       (message: IMessage) => {
//         const msg: ChatMessage = JSON.parse(message.body);
//         this.messages$.next([...this.messages$.value, msg]);
//       }
//     );
//
//     this.activeSubscriptions[roomId] = subscription;
//   }
//
//   leaveRoom(roomId: string) {
//     if (this.activeSubscriptions[roomId]) {
//       this.activeSubscriptions[roomId].unsubscribe();
//       delete this.activeSubscriptions[roomId];
//       console.log(`🚪 Left room ${roomId}`);
//     }
//   }
//
//   async sendMessage(roomId: string, msg: ChatMessage) {
//     await this.waitForConnection();
//
//     this.client.publish({
//       destination: `/app/chat/${roomId}`,
//       body: JSON.stringify(msg)
//     });
//   }
//
//   getMessages() {
//     return this.messages$.asObservable();
//   }
// }










//
// import { Injectable } from '@angular/core';
// import { Client, IMessage } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { BehaviorSubject } from 'rxjs';
// import {ChatMessage} from "./chat.model";
//
// @Injectable({ providedIn: 'root' })
// export class ChatService {
//   private client: Client;
//   private messages$ = new BehaviorSubject<ChatMessage[]>([]);
//
//   constructor() {
//     this.client = new Client({
//       webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
//       reconnectDelay: 5000
//     });
//
//     this.client.onConnect = () => {
//       console.log('Connected to chat server');
//     };
//
//     this.client.activate();
//   }
//   joinRoom(roomId: string) {
//     this.client.subscribe(`/topic/messages/${roomId}`, (message: IMessage) => {
//       const msg: ChatMessage = JSON.parse(message.body);
//       this.messages$.next([...this.messages$.value, msg]);
//     });
//   }
//
//   // 👉 Envoi vers le bon endpoint Spring
//   sendMessage(roomId: string, msg: ChatMessage) {
//     this.client.publish({
//       destination: `/app/chat/${roomId}`,
//       body: JSON.stringify(msg)
//     });
//   }
//
//   getMessages() {
//     return this.messages$.asObservable();
//   }
// }





