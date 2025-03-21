import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  Output,
  Signal
} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CommonModule, NgIf} from "@angular/common";
import {AuthService} from "../users/authService/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ButtonDirective,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  authService=inject(AuthService);
  isAuthenticated: boolean=false;
  private subscription: Subscription= new Subscription();
   user: any;

  ngOnInit(): void {
     this.authService.getUserInfo();
    this.authService.emitUserSubject().subscribe({
      next: (user)=>{
        this.user = user;
      console.log("user in login ", user);
      }

      }
    )
      // this.authService.authenticatedSuject$.subscribe({
      //   next: (value) => {this.isAuthenticated = value;}
      // });

    this.authService.emitisAutSubject().subscribe({
      next: (value) => {this.isAuthenticated = value;}
    });
  }




  ngOnDestroy(): void {

    if (this.subscription ) {
      this.subscription.unsubscribe(); // Empêche les erreurs de mémoire
    }
    console.log('LoginComponent détruit');

  }

  loginHybridApi(){
    window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';

  }
  //dans login.html

  login() {
    console.log(" this.isAuthenticated nlogin in AuthService  ", this.isAuthenticated);
    this.authService.fetchAuth0();


    // this.authService.emitisAutSubject().subscribe({
    //   next: (value) => {this.isAuthenticated = value;}
    // });
    // window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
  }

  logout(): void {
    //this.isAuthenticated = false;
    this.authService.loging();

    console.log("Utilisateur déconnecté ! ");
  }
}


function signalInput<T>(arg0: string): Signal<boolean> {
    throw new Error('Function not implemented.');
}

