
import { Injectable } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import {ChatMessage} from "./chat.Model";
import {User} from "../users/models/users";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private client: Client;
  private messages$ = new BehaviorSubject<ChatMessage[]>([]);
  private senders$ = new BehaviorSubject<User[]>([]);
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

  joinRoom(roomId: string, user: User) {
    // ⚠️ toujours string ici
    // if (this.activeSubscriptions[roomId]) {
    //   console.warn(`Already subscribed to room ${roomId}`);
    //   return;
    // }

    const subscription = this.client.subscribe(`/topic/messages/${roomId}`, (message: IMessage) => {
      const msg: ChatMessage = JSON.parse(message.body);
      this.messages$.next([...this.messages$.value, msg]);
     this.addUserToSenders(user);

    });

    this.activeSubscriptions[roomId] = subscription;
  }


  leaveRoom(roomId: string) {
    if (this.activeSubscriptions[roomId]) {
      this.activeSubscriptions[roomId].unsubscribe();
      console.log("leave room");
      delete this.activeSubscriptions[roomId];
    }
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


  public addUserToSenders(user: User) {
    const current = this.senders$.value;
    // éviter les doublons
    if (!current.find(u => u.email === user.email)) {
      this.senders$.next([...current, user]);
    }
  }
  //
  // public addUserToSender(user: User): void {
  //   // 1. Récupérer le tableau actuel des utilisateurs
  //   const currentUsers = this.senders$.getValue();
  //
  //   // 2. Vérifier si l'utilisateur existe déjà
  //   // On utilise un identifiant unique (par exemple, 'id', 'email', etc.) pour la vérification.
  //   // Dans cet exemple, nous supposons que chaque utilisateur a un 'firstname' et un 'lastname'.
  //   // Pour une vérification plus robuste, utilisez un identifiant unique.
  //   const userExists = currentUsers.some(
  //     (u) => u.firstname === user.firstname && u.lastname === user.lastname
  //   );
  //
  //   // 3. Si l'utilisateur n'existe pas, l'ajouter et mettre à jour le BehaviorSubject
  //   if (!userExists) {
  //     const updatedUsers = [...currentUsers, user];
  //     this.senders$.next(updatedUsers);
  //     console.log(`L'utilisateur ${user.firstname} a été ajouté à la liste des expéditeurs.`);
  //   } else {
  //     console.log(`L'utilisateur ${user.firstname} est déjà dans la liste des expéditeurs.`);
  //   }
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





