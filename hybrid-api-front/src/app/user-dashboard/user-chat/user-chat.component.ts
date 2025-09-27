
import {Component, inject, OnInit, Pipe, signal} from '@angular/core';
import {ChatComponent } from "../../websocket/chat/chat.component";
import {AuthService} from "../../users/authService/auth.service";
import {UserComponent} from "../../users/user/user.component";
import {NotificationRgisgister, User} from "../../users/models/users";
import {ChatService} from "../../websocket/chat.service";

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [
    ChatComponent
  ],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css'
})
export class UserChatComponent implements OnInit {

  // userName = signal<string>('UnKnownUser'); // ⚡ à remplacer par le vrai utilisateur connecté
 emptyUser: User={  firstname : "",
   lastname : "",
   uerfullname: "",
   email : "",
   imageUrl: "",
   isAuthenticated: false,
   userRole: "",
   type: "",
   authorities:[""],
   notification: { name:"",
     email : ""}}

  user = signal<User>(this.emptyUser);
  room = signal<string>("room1");
  private authService: AuthService=inject(AuthService);
  private chatService: ChatService = inject(ChatService);

  ngOnInit(): void {
    this.authService.emitUserSubject().subscribe({
      next: (usera: User | null | undefined) => {
        if (usera) {
          this.user.set(usera);
          console.log('UserChatComponent.ngOninit User connecté pour le chat :', usera);
        }
      }
    });
  }

}
