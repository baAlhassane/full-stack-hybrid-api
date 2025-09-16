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
import {UserInfoComponent} from "./user-info/user-info.component";

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    FormsModule,
    ChipsModule,
    FormLoginComponent,
    RegistrationComponent, UserInfoComponent
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  authService=inject(AuthService);
   isAuthenticated=signal(false) ;
  private subscription: Subscription= new Subscription();
  user: User | undefined;






  @ViewChild('loginForm')
  loginForm: NgForm | undefined;

  ngOnInit(): void {
    console.log("🔥 LoginComponent ngOnInit lancé !");
    this.authService.emitisAutSubject().subscribe(
      {next: istAuth => {this.isAuthenticated.set(istAuth)}}
    )



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
    // console.log(" this.isAuthenticated login in AuthService  ", this.isAuthenticated());
    // this.authService.fetchAuth0();
    // window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';


  }



  logout(): void {
    //this.isAuthenticated = false;
    // this.authService.emitisAutSubject().subscribe(
    //   {next: (value) => {this.isAuthenticated.set(false)}}
    // )
    // this.authService.toggleIsAuthenticated();

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





