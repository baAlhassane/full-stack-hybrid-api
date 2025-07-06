import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {LoginComponent} from "../../../login/login.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../../users/authService/auth.service";
import {CommonModule, NgStyle} from "@angular/common";
import {authGuard} from "../../../users/authService/authGuard";


@Component({
  selector: 'app-sig-in',
  standalone: true,
  imports: [CommonModule,
    LoginComponent,
    FaIconComponent,
    RouterLink,
    NgStyle, LoginComponent
  ],
  templateUrl: './sig-in.component.html',
  styleUrl: './sig-in.component.css'
})
export class SigInComponent implements OnInit, OnDestroy {


  subscription: Subscription= new Subscription();

  isAuthenticated=signal(false) ;

  constructor(private authService: AuthService) {}
  user: any | null = null;
  ngOnInit() {

    this.authService.emitUserSubject()
      .subscribe(
        {
          next: (value) => {
            this.user = value;
          },
          error: error => { console.log(error); },
        }
      );
    this.authService.emitisAutSubject().subscribe({
      next: (value) => {this.isAuthenticated.set(value); },
      error: error => { console.log(error); },
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe(); // Évite les fuites de mémoire
  }



}
