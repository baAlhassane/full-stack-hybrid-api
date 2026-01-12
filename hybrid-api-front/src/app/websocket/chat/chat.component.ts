import {Component, OnInit, OnDestroy, effect, InputSignal, input, ViewChild, ElementRef} from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage} from "../chat.Model";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgClass, NgFor, NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {RelativeTimePipe} from "../../pipes/relative-time.pipe";
import {AppUser, BaseUser, User} from "../../users/models/users";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    RelativeTimePipe,
    FormsModule,
    NgClass, NgFor, NgIf
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy  {
  messages: ChatMessage[] = [];
  senders: AppUser[] = [];
  newMessage = '';
  //senderName: InputSignal<string> = input.required<string>();
  user: InputSignal<AppUser>=input.required<AppUser>();
  roomId: InputSignal<string> = input.required<string>();
  private sub?: Subscription;
   // user: BaseUser;
  constructor(private chatService: ChatService) {}
  ngOnInit() {
    const room = this.roomId();
    console.log("🚀 ChatComponent.ngOnInit  Joining room:", room);

    this.chatService.joinRoom(room, this.user());
    this.sub = this.chatService.getMessages().subscribe(msgs => {
      this.messages = msgs;
      console.log(" ChatComponent.ngOnInit this.sub = this.chatService.getMessages().subscribe + this.messages ", this.messages);
      console.log(" ChatComponent.ngOnInit this.sub = this.chatService.getMessages().subscribe + this.messages ", this.user().firstname);
      console.log(" this.user() in joinRoom :  ", this.user());

    });

    this.chatService.getSenders().subscribe(senders => {
      this.senders = senders;
      console.log("Utilisateurs connectés :", this.senders);
    });

    console.log("this.messages ", this.messages);
  }
  send() {
    const msg: ChatMessage = {
      sender: this.user().firstname,
      receiver: '', // vide car public
      content: this.newMessage,
      roomId: this.roomId(),
      timestamp: new Date().toISOString()
    };
    this.chatService.sendMessage(this.roomId(), msg);
    this.newMessage = '';
    console.log("Sending message:", this.roomId());
    // this.chatService.addUserToSender(this.user())
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
   this.chatService.leaveRoom(this.roomId(), this.user()); // deplacer dans logout
  }

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }



}




 /* code qui marche avec les methodes asynchrone et await */
// import { Component, OnInit, OnDestroy, InputSignal, input } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Subscription } from 'rxjs';
// import { ChatService } from '../chat.service';
// import { ChatMessage } from '../chat.Model';
// import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
//
// @Component({
//   selector: 'app-chat',
//   standalone: true,
//   imports: [FormsModule, RelativeTimePipe],
//   templateUrl: './chat.component.html',
//   styleUrl: './chat.component.css'
// })
// export class ChatComponent implements OnInit, OnDestroy {
//   messages: ChatMessage[] = [];
//   newMessage = '';
//
//   senderName: InputSignal<string> = input.required<string>();
//   roomId: InputSignal<string> = input.required<string>();
//
//   private sub?: Subscription;
//
//   constructor(private chatService: ChatService) {}
//
//   async ngOnInit() {
//     const room = this.roomId();
//     console.log('ChatComponent.ngOnInit → Joining room:', room);
//
//     await this.chatService.joinRoom(room);
//
//     this.sub = this.chatService.getMessages().subscribe((msgs) => {
//       this.messages = msgs;
//       console.log('Messages reçus :', this.messages);
//     });
//   }
//
//   async send() {
//     const msg: ChatMessage = {
//       sender: this.senderName(),
//       receiver: '', // public
//       content: this.newMessage,
//       roomId: this.roomId(),
//       timestamp: new Date().toISOString()
//     };
//
//     await this.chatService.sendMessage(this.roomId(), msg);
//     this.newMessage = '';
//   }
//
//   ngOnDestroy() {
//     this.sub?.unsubscribe();
//     this.chatService.leaveRoom(this.roomId());
//   }
// }
//
