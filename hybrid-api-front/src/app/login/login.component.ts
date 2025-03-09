import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {NgIf} from "@angular/common";
import {AuthService} from "../users/authService/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
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
      this.authService.getUserInfo(); // Récupérer l'info utilisateur au chargement
    this.subscription= this.authService
      .emitSubject()
      .subscribe(
        {
          next: (value) => this.isAuthenticated = value,
          error: error => { console.log(error); },
        }
      )
    this.authService.user$.subscribe(user => {
      this.user = user;
    });


  }


  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe(); // Empêche les erreurs de mémoire
    }
    console.log('LoginComponent détruit');

  }

  loginHybridApi(){
    window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';

  }
  //dans login.html
  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
    console.log("Utilisateur connecté ! ");

  }

  logout(): void {
   // this.isAuthenticated = false;
    //this.authService.upDateisAUthenticated(this.isAuthenticated);
    //this.authService.toggleIsAuthenticated();
    this.authService.logout();
    console.log("Utilisateur déconnecté ! ");
  }
}
