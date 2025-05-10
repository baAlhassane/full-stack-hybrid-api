import {
  booleanAttribute,
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  Output, signal,
  Signal, ViewChild, WritableSignal
} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CommonModule, NgIf} from "@angular/common";
import {AuthService} from "../users/authService/auth.service";
import {Subscription} from "rxjs";

import {User} from "../users/models/users";
import {FormsModule, NgForm} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {FormLoginComponent} from "./form-login/form-login.component";
import {RegistrationComponent} from "./registration/registration.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ButtonDirective,
    NgIf,
    FormsModule,
    ChipsModule,
    FormLoginComponent,
    RegistrationComponent

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  authService=inject(AuthService);
   isAuthenticated=signal(false) ;
  //isAuthenticated:boolean=false;
  private subscription: Subscription= new Subscription();
  user: User | undefined;






  @ViewChild('loginForm')
  loginForm: NgForm | undefined;

  ngOnInit(): void {
     this.authService.getUserInfo();
    this.authService.emitUserSubject().subscribe({
      next: (user)=>{
        this.user = user;
      console.log("user in login ", user);
      }

      }
    )

    this.authService.emitisAutSubject().subscribe({
    //  next: (value) => {this.isAuthenticated=value}
      next: (value) => {this.isAuthenticated.set(value)}
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
    console.log(" this.isAuthenticated login in AuthService  ", this.isAuthenticated);
    this.authService.fetchAuth0();
    // window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
  }


  logout(): void {
    //this.isAuthenticated = false;
    this.authService.loging();

    console.log("Utilisateur déconnecté ! ");
  }

  onSubmitForm() {
    // console.log( form )
    if(this.loginForm?.valid){
      console.log(this.loginForm.value);
    }
  }



  onRegister() {

  }
}





